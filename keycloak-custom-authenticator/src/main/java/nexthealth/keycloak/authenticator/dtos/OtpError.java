package nexthealth.keycloak.authenticator.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OtpError {

    String code;
    String message;
    int resendWaitPeriodMillis;
}
