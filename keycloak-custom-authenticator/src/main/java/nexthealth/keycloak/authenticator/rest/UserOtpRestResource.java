package nexthealth.keycloak.authenticator.rest;

import nexthealth.keycloak.authenticator.dtos.*;
import nexthealth.keycloak.authenticator.service.OtpService;
import org.jboss.logging.Logger;
import org.keycloak.models.KeycloakSession;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

public class UserOtpRestResource {

	private static final Logger logger = Logger.getLogger(UserOtpRestResource.class);
	private final KeycloakSession session;

	private OtpService otpService;

	public UserOtpRestResource(KeycloakSession session) {
		this.session = session;
		this.otpService = new OtpService(session);
	}

	@POST
	@Path("otp")
	@Consumes(MediaType.APPLICATION_JSON)
	public GenerateOTPOutput generateotp(GenerateOTPInput generateOTPInput) {
		return this.otpService.generateotp(generateOTPInput);
	}
}
