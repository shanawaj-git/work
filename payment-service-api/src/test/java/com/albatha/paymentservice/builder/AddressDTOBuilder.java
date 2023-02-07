package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.dto.AddressDTO;

public class AddressDTOBuilder {

    String LINE_1 = "TMC building ";
    String LINE_2 = "Silicon height";
    String CITY = "Alain street";
    String POSTALCODE = "33321222";
    String COUNTRY = "AE";
    String STATE = "Dubai";

    public AddressDTO build() {
        AddressDTO addressDTO = new AddressDTO();
        addressDTO.setLine1(LINE_1);
        addressDTO.setLine2(LINE_2);
        addressDTO.setCity(CITY);
        addressDTO.setPostalCode(POSTALCODE);
        addressDTO.setCountry(COUNTRY);
        addressDTO.setState(STATE);
        return addressDTO;
    }
}
