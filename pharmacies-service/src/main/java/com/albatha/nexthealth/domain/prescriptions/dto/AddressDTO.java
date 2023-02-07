package com.albatha.nexthealth.domain.prescriptions.dto;

import lombok.Data;

@Data
public class AddressDTO {
    public String addressLine1;
    public String addressLine2;
    public String area;
    public String city;
    public String state;
    public String postalCode;
    public String type;
    public String country;
}