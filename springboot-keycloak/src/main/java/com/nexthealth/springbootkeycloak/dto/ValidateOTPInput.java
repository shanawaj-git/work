package com.nexthealth.springbootkeycloak.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ValidateOTPInput {

    @NotBlank
    String phoneNumber;

    @NotBlank
    String otp;
}
