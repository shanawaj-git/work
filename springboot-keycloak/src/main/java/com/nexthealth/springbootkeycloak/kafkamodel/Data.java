package com.nexthealth.springbootkeycloak.kafkamodel;

import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Data {

    String otp;
    String phoneNumber;
}
