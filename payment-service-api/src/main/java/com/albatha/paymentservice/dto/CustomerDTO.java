package com.albatha.paymentservice.dto;

import com.albatha.paymentservice.model.CustomerName;
import com.albatha.paymentservice.validation.ValidEmail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {
    private CustomerName name;
    @ValidEmail
    private String email;
    private String phone;
    private String applicationCustomerId;
    private String providerCustomerId;
    private Object providerMetadata;
    private ApplicationDTO application;
}
