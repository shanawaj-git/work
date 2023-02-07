package com.nexthealth.springbootkeycloak.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class GenerateOTPInput {

    @NotBlank
    String phoneNumber;

}
