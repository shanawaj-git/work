package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.defaultData.DefaultBillingDetails;
import com.albatha.paymentservice.model.Address;
import com.albatha.paymentservice.model.BillingDetails;
import com.albatha.paymentservice.model.CustomerName;

public class BillingDetailsBuilder {
    String email = DefaultBillingDetails.email;
    String phone = DefaultBillingDetails.phone;
    CustomerName name = new CustomerNameBuilder().build();
    Address address = new AddressBuilder().build();

    public BillingDetails build() {
        return new BillingDetails(name, address, email, phone);
    }

    public BillingDetailsBuilder name(CustomerName customerName) {
        this.name = customerName;
        return this;
    }

    public BillingDetailsBuilder address(Address address) {
        this.address = address;
        return this;
    }
}


