package com.nexthealth.springbootkeycloak.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GenerateOTPOutput {


    Boolean success;
    OtpError error;
    String otp;
    String phoneNumber;
    String jwtToken;

}

