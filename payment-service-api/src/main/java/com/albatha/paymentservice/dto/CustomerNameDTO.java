package com.albatha.paymentservice.dto;

import lombok.Data;

@Data
public class CustomerNameDTO {
    private String firstName;
    private String middleName;
    private String lastName;
    public String getFullName()
    {
        return firstName+" "+ middleName+" "+lastName;
    }
}
