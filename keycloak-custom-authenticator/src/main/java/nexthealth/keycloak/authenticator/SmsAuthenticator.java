package nexthealth.keycloak.authenticator;


import nexthealth.keycloak.authenticator.dtos.OTPVerificationErrorCode;
import nexthealth.keycloak.authenticator.dtos.OtpValidationError;
import nexthealth.keycloak.authenticator.dtos.UserAttributes;
import org.jboss.logging.Logger;
import org.keycloak.authentication.AuthenticationFlowContext;
import org.keycloak.authentication.AuthenticationFlowError;
import org.keycloak.authentication.Authenticator;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;
import org.keycloak.models.UserModel;

import javax.ws.rs.core.Response;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;

/**
 * @author shanawaj khan
 */
public class SmsAuthenticator implements Authenticator {
    private static final Logger logger = Logger.getLogger(SmsAuthenticator.class);
    private static final int MAX_ATTEMPTS = 5;
    private static final long OTP_VALIDITY_IN_MS = 60 * 1000L;
    private static final int OTP_LENGTH = 6;

    public SmsAuthenticator() {
        System.out.println("object created ");
    }


    @Override
    public void authenticate(AuthenticationFlowContext context) {
        OffsetDateTime currentDateTime = OffsetDateTime.now(ZoneOffset.UTC);
        long currentDateInM = currentDateTime.toInstant().toEpochMilli();

        if (this.clearUserAttributes(context)) {
            OtpValidationError otpError = new OtpValidationError(OTPVerificationErrorCode.ERR_INVALID_GRANT.description, OTPVerificationErrorCode.USER_ATTRIBUTES_REQUIRED.description, OTPVerificationErrorCode.USER_ATTRIBUTES_REQUIRED.code, 0);
            context.failure(AuthenticationFlowError.INVALID_CREDENTIALS, Response.status(Response.Status.UNAUTHORIZED).entity(otpError).build());
            return;
        }
        String fail_attempt_count = context.getUser().getAttributes().get(UserAttributes.FAIL_ATTEMPT_COUNT.name).get(0);

        String otp = context.getHttpRequest().getDecodedFormParameters().getFirst(UserAttributes.OTP.name);

        if (otp == null  || otp.length() < OTP_LENGTH) {
            OtpValidationError otpError = new OtpValidationError(OTPVerificationErrorCode.ERR_INVALID_GRANT.description, OTPVerificationErrorCode.OTP_IS_REQUIRED.description, OTPVerificationErrorCode.OTP_IS_REQUIRED.code, 0);
            context.failure(AuthenticationFlowError.INVALID_CREDENTIALS, Response.status(Response.Status.UNAUTHORIZED).entity(otpError).build());
            return;
        }


        boolean maxAttempts = this.checkMaxAttempts(fail_attempt_count);

        if (maxAttempts) {
            OtpValidationError otpError = new OtpValidationError(OTPVerificationErrorCode.ERR_INVALID_GRANT.description, OTPVerificationErrorCode.MAX_ATTEMPTS_EXCEEDED.description, OTPVerificationErrorCode.MAX_ATTEMPTS_EXCEEDED.code, 0);
            context.failure(AuthenticationFlowError.INVALID_CREDENTIALS, Response.status(Response.Status.UNAUTHORIZED).entity(otpError).build());
            return;
        }

        boolean validOtp = this.checkTTL(context, currentDateInM);
        boolean wrongOtpInput = this.checkOTP(context, currentDateInM);

        if (wrongOtpInput) {
            OtpValidationError otpError = new OtpValidationError(OTPVerificationErrorCode.ERR_INVALID_GRANT.description, OTPVerificationErrorCode.INVALID_CREDENTIALS.description, OTPVerificationErrorCode.INVALID_CREDENTIALS.code, 0);
            context.failure(AuthenticationFlowError.INVALID_CREDENTIALS, Response.status(Response.Status.UNAUTHORIZED).entity(otpError).build());
            return;
        }
        if (!validOtp) {
            OtpValidationError otpError = new OtpValidationError(OTPVerificationErrorCode.ERR_INVALID_GRANT.description, OTPVerificationErrorCode.EXPIRED_OTP.description, OTPVerificationErrorCode.EXPIRED_OTP.code, 0);
            context.failure(AuthenticationFlowError.INVALID_CREDENTIALS, Response.status(Response.Status.BAD_REQUEST).entity(otpError).build());
            return;
        }

        this.generateJWTAndClean(context, currentDateInM);

    }

    private void generateJWTAndClean(AuthenticationFlowContext context, Long currentDateInM) {
        context.getUser().setSingleAttribute(UserAttributes.LAST_VERIFY_ATTEMPT_AT.name, String.valueOf(currentDateInM));
        context.getUser().setSingleAttribute(UserAttributes.OTP_GENERATED_COUNT.name, "0");
        context.getUser().setSingleAttribute(UserAttributes.OTP.name, "");
        context.getUser().setSingleAttribute(UserAttributes.FAIL_ATTEMPT_COUNT.name, "0");
        context.success();
    }

    private boolean checkMaxAttempts(String fail_attempt_count) {
        Integer fail_attempt_count_to_integer = Integer.parseInt(fail_attempt_count);
        if (fail_attempt_count_to_integer >= this.MAX_ATTEMPTS) {
            return true;
        }
        return false;
    }

    private boolean checkOTP(AuthenticationFlowContext context, Long dateTimeInMS) {
        String otp = context.getHttpRequest().getDecodedFormParameters().getFirst(UserAttributes.OTP.name);
        String savedOtp = context.getUser().getAttributes().get(UserAttributes.OTP.name).get(0);
        String fail_attempt_count = context.getUser().getAttributes().get(UserAttributes.FAIL_ATTEMPT_COUNT.name).get(0);
        context.getUser().setSingleAttribute(UserAttributes.LAST_VERIFY_ATTEMPT_AT.name, String.valueOf(dateTimeInMS));

        if (!otp.equals(savedOtp)) {
            context.getUser().setSingleAttribute(UserAttributes.LAST_VERIFY_ATTEMPT_AT.name, String.valueOf(dateTimeInMS));
            int fail_attempt_count_to_integer = Integer.parseInt(fail_attempt_count) + 1;
            context.getUser().setSingleAttribute(UserAttributes.FAIL_ATTEMPT_COUNT.name, String.valueOf(fail_attempt_count_to_integer));
            return true;
        }
        return false;
    }

    private boolean checkTTL(AuthenticationFlowContext context, Long dateTimeInMS) {
        String otp_created_at = context.getUser().getAttributes().get(UserAttributes.OTP_CREATED_AT.name).get(0);
        String fail_attempt_count = context.getUser().getAttributes().get(UserAttributes.FAIL_ATTEMPT_COUNT.name).get(0);
        Long otpCreationDate = Long.parseLong(otp_created_at);
        Long ttl = otpCreationDate + this.OTP_VALIDITY_IN_MS;

        if (ttl < dateTimeInMS) {
            context.getUser().setSingleAttribute(UserAttributes.LAST_VERIFY_ATTEMPT_AT.name, String.valueOf(dateTimeInMS));
            int fail_attempt_count_to_integer = Integer.parseInt(fail_attempt_count) + 1;
            context.getUser().setSingleAttribute(UserAttributes.FAIL_ATTEMPT_COUNT.name, String.valueOf(fail_attempt_count_to_integer));
            return false;
        }
        return true;
    }

    private boolean clearUserAttributes(AuthenticationFlowContext context) {
        UserModel user = context.getUser();
        for (UserAttributes attr : UserAttributes.values()) {
            String attrName = user.getAttributeStream(attr.name).findFirst().orElse(null);
            if (attrName == null) {
                return true;
            }
        }
        return false;
    }

    @Override
    public void action(AuthenticationFlowContext context) {
    }

    @Override
    public boolean requiresUser() {
        return false;
    }

    @Override
    public boolean configuredFor(KeycloakSession session, RealmModel realm, UserModel user) {
        return true;
    }

    @Override
    public void setRequiredActions(KeycloakSession session, RealmModel realm, UserModel user) {
    }

    @Override
    public void close() {
    }

}
