package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.defaultData.DefaultAddress;
import com.albatha.paymentservice.model.Address;

public class AddressBuilder {
    String line1 = DefaultAddress.LINE_1;
    String line2 = DefaultAddress.LINE_2;
    String city = DefaultAddress.CITY;
    String postalCode = DefaultAddress.POSTALCODE;
    String country = DefaultAddress.COUNTRY;
    String state = DefaultAddress.STATE;

    public Address build() {
       return new Address(line1, line2, city, postalCode, country, state);
    }
}


