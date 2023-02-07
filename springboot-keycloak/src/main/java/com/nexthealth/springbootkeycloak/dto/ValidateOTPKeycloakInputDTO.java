package com.nexthealth.springbootkeycloak.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ValidateOTPKeycloakInputDTO {

    private String username;
    private String grant_type;
    private String client_id;
    private String client_secret;
    private String otp;

}
