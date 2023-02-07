package com.albatha.paymentservice.dto;

import lombok.Data;

@Data
public class BillingDetailsDTO {
    private AddressDTO address;
    private String email;
    private CustomerNameDTO name;
    private String phone;
}
