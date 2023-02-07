package com.nexthealth.springbootkeycloak.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OtpError {

    String code;
    String message;
    String resendWaitPeriodMillis;
}
