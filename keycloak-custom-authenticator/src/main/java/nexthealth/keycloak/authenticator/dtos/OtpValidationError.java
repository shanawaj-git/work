package nexthealth.keycloak.authenticator.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OtpValidationError {
    String error;
    String error_description;
    String error_code;
    int resend_wait_period_millis;
}


