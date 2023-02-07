package nexthealth.keycloak.authenticator.service;

/**
 * CustomUserAttributes
 * 
 * The enumerator over custom defined user attributes on Keycloak
 * 
 */
public enum UserAttribute {
	USERNAME("username"),
	OTP("otp"),
	OTP_CREATED_AT("otp_created_at"),
	OTP_GENERATED_COUNT("otp_generated_count"),
	FAIL_ATTEMPT_COUNT("fail_attempt_count"),
	LAST_VERIFY_ATTEMPT_AT("last_verify_attempt_at");
	
	public final String key;
	UserAttribute(String code) {
		this.key = code;
	}
}
