package com.albatha.nexthealth.prescription.builders;

import com.albatha.nexthealth.prescription.defaultData.DefaultAddressData;
import com.albatha.nexthealth.prescription.domain.Address;

import java.sql.Timestamp;

public class AddressBuilder {
    public Long addressId = DefaultAddressData.ADDRESS_ID;
    public String addressLine1 = DefaultAddressData.ADDRESS_LINE_1;
    public String addressLine2 = DefaultAddressData.ADDRESS_LINE_2;
    public String area = DefaultAddressData.AREA;
    public String city = DefaultAddressData.CITY;
    public String state = DefaultAddressData.STATE;
    public String postalCode = DefaultAddressData.POSTAL_CODE;
    public String type = DefaultAddressData.TYPE;
    public String country = DefaultAddressData.COUNTRY;
    public Timestamp createdDate = DefaultAddressData.CREATED_DATE;

    // You can create a function for the fields you wish to set
    public AddressBuilder addressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
        return this;
    }

    public Address build() {
        return new Address(addressId, addressLine1, addressLine2, area, city,
                state, postalCode, type, country, createdDate);
    }
}
