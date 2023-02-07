package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.defaultData.DefaultCustomerName;
import com.albatha.paymentservice.model.CustomerName;

public class CustomerNameBuilder {
    String firstName= DefaultCustomerName.firstName;
    String middleName= DefaultCustomerName.middleName;
    String lastName= DefaultCustomerName.lastName;

    String salutation= DefaultCustomerName.salutation;

    public CustomerName build()
    {
        return new CustomerName(firstName,middleName,lastName,salutation);
    }
}
