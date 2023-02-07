package nexthealth.keycloak.authenticator.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ValidateOTPOutput {

    Boolean success;
    OtpError otpError;
}
