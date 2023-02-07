package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.defaultData.DefaultCustomerName;
import com.albatha.paymentservice.dto.CustomerNameDTO;

public class PersonNameDTOBuilder {
    String firstName= DefaultCustomerName.firstName;
    String middleName= DefaultCustomerName.middleName;
    String lastName= DefaultCustomerName.lastName;

    String salutation= DefaultCustomerName.salutation;

    public CustomerNameDTO build()
    {
        CustomerNameDTO personNameDTO= new CustomerNameDTO();
        personNameDTO.setFirstName(firstName);
        personNameDTO.setMiddleName(middleName);
        personNameDTO.setLastName(lastName);
        return personNameDTO;
    }
}
