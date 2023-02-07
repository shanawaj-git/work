package com.albatha.paymentservice.dto;

import lombok.Data;

@Data
public class AddressDTO {
    private String city;
    private String country;
    private String line1;
    private String line2;
    private String postalCode;
    private String state;
}
