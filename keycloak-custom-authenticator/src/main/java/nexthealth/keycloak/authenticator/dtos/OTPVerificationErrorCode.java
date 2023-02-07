package nexthealth.keycloak.authenticator.dtos;

public enum OTPVerificationErrorCode {


    MAX_ATTEMPTS_EXCEEDED("AUTH_ERR_002", "Max attempts exceeded"),
    INVALID_CREDENTIALS("AUTH_ERR_101", "Invalid OTP Input"),
    USER_ATTRIBUTES_REQUIRED("AUTH_ERR_106", "User attibutes required"),
    OTP_IS_REQUIRED("AUTH_ERR_108", "OTP is required"),
    ERR_INVALID_GRANT("AUTH_ERR_119","invalid_grant"),
    EXPIRED_OTP("AUTH_ERR_102", "OTP code expired");
    public final String code;
    public final String description;

    private OTPVerificationErrorCode(String code, String description) {
        this.code = code;
        this.description = description;
    }
}
