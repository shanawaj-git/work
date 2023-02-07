package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.defaultData.DefaultBillingDetails;
import com.albatha.paymentservice.dto.AddressDTO;
import com.albatha.paymentservice.dto.BillingDetailsDTO;
import com.albatha.paymentservice.dto.CustomerNameDTO;

public class BillingDetailsDTOBuilder {
    String email = DefaultBillingDetails.email;
    String phone = DefaultBillingDetails.phone;
    CustomerNameDTO name = new CustomerNameDTOBuilder().build();
    private AddressDTO address;

    public BillingDetailsDTO build() {
        BillingDetailsDTO billingDetailsDTO = new BillingDetailsDTO();
        billingDetailsDTO.setEmail(email);
        billingDetailsDTO.setPhone(phone);
        billingDetailsDTO.setAddress(address);
        billingDetailsDTO.setName(name);
        return billingDetailsDTO;

    }

    public BillingDetailsDTOBuilder address(AddressDTO address) {
        this.address = address;
        return this;
    }

    public BillingDetailsDTOBuilder name(CustomerNameDTO customerName) {
        this.name = customerName;
        return this;
    }
}
