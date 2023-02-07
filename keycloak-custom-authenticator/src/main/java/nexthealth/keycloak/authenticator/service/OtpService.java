package nexthealth.keycloak.authenticator.service;

import nexthealth.keycloak.authenticator.dtos.ErrorCode;
import nexthealth.keycloak.authenticator.dtos.GenerateOTPInput;
import nexthealth.keycloak.authenticator.dtos.GenerateOTPOutput;
import nexthealth.keycloak.authenticator.dtos.OtpError;
import org.jboss.logging.Logger;
import org.keycloak.common.util.SecretGenerator;
import org.keycloak.connections.jpa.JpaConnectionProvider;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RoleModel;
import org.keycloak.models.jpa.entities.UserAttributeEntity;
import org.keycloak.models.jpa.entities.UserEntity;
import org.keycloak.models.jpa.entities.UserRoleMappingEntity;
import org.keycloak.models.utils.KeycloakModelUtils;

import javax.naming.LimitExceededException;
import javax.persistence.EntityManager;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Collection;
import java.util.Hashtable;
import java.util.concurrent.TimeUnit;




public class OtpService {

    static final int OPT_LENGTH = 6;
    static int OTP_GENERATION_DELAY_IN_SECONDS = 30;

    static final String CLIENT_ID = "sms-otp-auth-client";
    static final String USER_ROLE = "app_user";

    private static final Logger logger = Logger.getLogger(nexthealth.keycloak.authenticator.service.OtpService.class);


    KeycloakSession session;

    public OtpService(KeycloakSession session) {
        this.session = session;

    }

    EntityManager getEntityManager() {
        return session.getProvider(JpaConnectionProvider.class).getEntityManager();
    }

    public GenerateOTPOutput generateotp(GenerateOTPInput generateOTPInput) {
        GenerateOTPOutput generateOTPOutput = new GenerateOTPOutput();
        String phoneNumber = generateOTPInput.getPhoneNumber();
        try {
            canUserGenerateOtp(phoneNumber);

            String otp = generateOtp(phoneNumber);

            generateOTPOutput.setOtp(otp);
            generateOTPOutput.setSuccess(true);

            logger.infof("otp generated successfully for user %s", phoneNumber);

        } catch (LimitExceededException e){

            generateOTPOutput.setError(generateOtpError(ErrorCode.MAX_REQUEST_COUNT_REACHED.key, e.getMessage()));
            generateOTPOutput.setSuccess(false);
            logger.infof("user with phone number %s is trying to generate too many requests", phoneNumber);

        } catch (Exception e) {
            logger.infof("Internal server error happened while generating otp for user %s, error message: %s", phoneNumber, e.getMessage());

            generateOTPOutput.setError(generateOtpError("INTERNAL_SERVER_ERROR" , e.getMessage()));
            generateOTPOutput.setSuccess(false);
        } finally {
            session.userCache().clear();

        }


        return generateOTPOutput;
    }

    private OtpError generateOtpError(String code, String message) {
        OtpError error = new OtpError();
        error.setCode(code);
        error.setMessage(message);

        return error;
    }

    private void canUserGenerateOtp(String mobileNumber) throws Exception {
        UserEntity user = getUserByMobileNumber(mobileNumber);

        if(user != null) {
            String otpCreatedAt = getUserAttributeValueByAttributeName(user, UserAttribute.OTP_CREATED_AT.key);

            Timestamp createdAtTimestamp = Timestamp.from(Instant.ofEpochMilli(Long.parseLong(otpCreatedAt)));
            createdAtTimestamp.setTime(createdAtTimestamp.getTime() + TimeUnit.SECONDS.toMillis(OTP_GENERATION_DELAY_IN_SECONDS));

            if(Timestamp.from(Instant.now()).before(createdAtTimestamp)) {
                throw new LimitExceededException();
            }
        }

    }

    private String generateOtp(String mobileNumber) {
        UserEntity user = getUserByMobileNumber(mobileNumber);

        if(user == null) {
            user = createUser(mobileNumber);
        }

        return getNewOtpForUser(user);
    }

    private UserEntity createUser(String phoneNumber) {
        UserEntity user = new UserEntity();
        user.setUsername(phoneNumber);
        user.setId(KeycloakModelUtils.generateId());
        user.setEnabled(true);
        user.setRealmId(session.getContext().getRealm().getId());

        getEntityManager().persist(user);
        addRoleToUser(user);

        return user;
    }

    private void addRoleToUser(UserEntity user) {
        RoleModel role = session.getContext().getRealm().getClientByClientId(CLIENT_ID).getRole(USER_ROLE);
        UserRoleMappingEntity userRole = new UserRoleMappingEntity();
        userRole.setUser(user);
        userRole.setRoleId(role.getId());
        getEntityManager().persist(userRole);
    }

    private UserEntity getUserByMobileNumber(String mobileNumber) {
        Collection<UserEntity> userEntity = getEntityManager().createNamedQuery("getRealmUserByUsername" , UserEntity.class)
                .setParameter("username",mobileNumber)
                .setParameter("realmId", session.getContext().getRealm().getId())
                .getResultList();
        UserEntity user= userEntity.stream().findFirst().orElse(null);

        return user;
    }

    private String getNewOtpForUser(UserEntity user) {

        Hashtable<String, String> newUserAttributes = generateUserAttributes(user);

        newUserAttributes.entrySet().forEach(entry -> {
            UserAttributeEntity attr = new UserAttributeEntity();
            attr.setId(KeycloakModelUtils.generateId());
            attr.setName(entry.getKey());
            attr.setValue(entry.getValue());
            attr.setUser(user);
            getEntityManager().persist(attr);
        });

        getEntityManager().persist(user);

        return newUserAttributes.get(UserAttribute.OTP.key);
    }

    Hashtable<String, String> generateUserAttributes(UserEntity user) {
        Hashtable<String, String> newUserAttributes = new Hashtable<String, String>();

        String otpGenerationCountPreviousValue = getUserAttributeValueByAttributeName(user, UserAttribute.OTP_GENERATED_COUNT.key);

        // get old values before clearing them
        int otpGenerationCount = otpGenerationCountPreviousValue != null ? Integer.parseInt(otpGenerationCountPreviousValue) + 1 : 1;
        long timestamp = Timestamp.from(Instant.now()).getTime();

        cleanUpUserAttributes(user);

        // adding the new values
        newUserAttributes.put(UserAttribute.OTP.key, SecretGenerator.getInstance().randomString(OPT_LENGTH, SecretGenerator.DIGITS));
        newUserAttributes.put(UserAttribute.OTP_CREATED_AT.key, String.valueOf(timestamp));
        newUserAttributes.put(UserAttribute.FAIL_ATTEMPT_COUNT.key, "0");
        newUserAttributes.put(UserAttribute.OTP_GENERATED_COUNT.key, String.valueOf(otpGenerationCount));
        newUserAttributes.put(UserAttribute.LAST_VERIFY_ATTEMPT_AT.key, "null");


        return newUserAttributes;
    }

    private String getUserAttributeValueByAttributeName(UserEntity user, String attributeName) {
        UserAttributeEntity userAttribute =  user.getAttributes().stream().filter(e -> e.getName().equals(attributeName)).findFirst().orElse(null);

        return userAttribute != null ? userAttribute.getValue() : null;
    }

    private void cleanUpUserAttributes(UserEntity user) {
        for(UserAttribute userAttribute: UserAttribute.values()) {
            deleteUserAttributeByName(user.getId(), userAttribute.key);
        }

    }

    private void deleteUserAttributeByName(String userId, String attibuteName) {
        getEntityManager().createNamedQuery("deleteUserAttributesByNameAndUser")
                .setParameter("userId", userId)
                .setParameter("name", attibuteName).executeUpdate();
    }
}




