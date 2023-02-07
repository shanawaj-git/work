package nexthealth.keycloak.authenticator.validations;

import nexthealth.keycloak.authenticator.SmsAuthenticator;
import org.jboss.logging.Logger;
import org.keycloak.authentication.AuthenticationFlowContext;
import org.keycloak.authentication.AuthenticationFlowError;
import org.keycloak.authentication.ValidationContext;
import org.keycloak.models.AuthenticationExecutionModel;

import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;

public class Validation {

    private static final Logger logger = Logger.getLogger(Validation.class);
    protected void validateOtp(String  enteredCode, String  ttl, String mobileNumberReceived , AuthenticationFlowContext context )
    {
        Map<String, List<String>> otpMap=context.getUser().getAttributes();
        String mobileNumber=null;
        String otp=null;
        for (Map.Entry<String, List<String>> entry : otpMap.entrySet())
        {
            if(entry.getKey().equals("otp"))
                otp=entry.getValue().get(0);
             else
               mobileNumber=entry.getValue().get(0);
        }
        logger.infof("movile number %s  and otp %s ",mobileNumber ,otp);
        if (otp == null || ttl == null) {
            context.failureChallenge(AuthenticationFlowError.INTERNAL_ERROR,
                    context.form().createErrorPage(Response.Status.INTERNAL_SERVER_ERROR));
            return;
        }

        boolean isValid = enteredCode.equals(otp);
        if (isValid) {
            if (Long.parseLong(ttl) < System.currentTimeMillis()) {
                // expired
                context.failure(AuthenticationFlowError.EXPIRED_CODE);
            } else {
                // valid
                context.success();
            }
        } else {
            // invalid
            AuthenticationExecutionModel execution = context.getExecution();
            if (execution.isRequired()) {
                context.failure(AuthenticationFlowError.INVALID_CREDENTIALS);
            } else if (execution.isConditional() || execution.isAlternative()) {
                context.attempted();
            }
        }
    }
}
