package nexthealth.keycloak.authenticator.dtos;

public enum ErrorCode {
    MAX_REQUEST_COUNT_REACHED("AUTH_ERR_001");

    public final String key;
    ErrorCode(String code) {
        this.key = code;
    }
}
