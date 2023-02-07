package com.albatha.nexthealth.pharmacies.builders;

import com.albatha.nexthealth.pharmacies.defaultData.DefaultAddress;
import com.albatha.nexthealth.pharmacies.model.Address;

public class AddressBuilder {
    String addressLine1 = DefaultAddress.ADDRESS_LINE_1;
    String addressLine2 = DefaultAddress.ADDRESS_LINE_2;
    String street = DefaultAddress.STREET;
    String area = DefaultAddress.AREA;
    String city = DefaultAddress.CITY;
    String state = DefaultAddress.STATE;
    String country = DefaultAddress.COUNTRY;

    public Address build() {
        return new Address(addressLine1, addressLine2, street, area, city, state, country);
    }
}
