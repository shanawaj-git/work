package com.nexthealth.springbootkeycloak.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class ErrorResponseDTO {

    String error;
    String error_description;
    String error_code;
    String resend_wait_period_millis;
}
