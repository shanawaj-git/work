package nexthealth.keycloak.authenticator.dtos;

public enum UserAttributes {
    OTP("otp"),
    OTP_GENERATED_COUNT("otp_generated_count"),
    FAIL_ATTEMPT_COUNT("fail_attempt_count"),
    OTP_CREATED_AT("otp_created_at"),
    LAST_VERIFY_ATTEMPT_AT("last_verify_attempt_at");
    public final String name;

    private UserAttributes(String name) {
        this.name = name;
    }
}
