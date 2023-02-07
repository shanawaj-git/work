package com.albatha.nexthealth.pharmacies.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    private String addressLine1;
    private String addressLine2;
    private String street;
    private String area;
    private String city;
    private String state;
    private String country;

}
