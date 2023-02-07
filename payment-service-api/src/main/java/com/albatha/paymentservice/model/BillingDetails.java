package com.albatha.paymentservice.model;

import com.albatha.paymentservice.dto.BillingDetailsDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BillingDetails {
    @NotNull
    private CustomerName customerName;

    private Address address;

    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}",
            flags = Pattern.Flag.CASE_INSENSITIVE)
    private String email;
    @NotNull
    private String phone;

    public BillingDetails(BillingDetailsDTO billingDetailsDTO, Address address) {
            this.address = address;
            this.email = billingDetailsDTO.getEmail();
            this.customerName = new CustomerName(billingDetailsDTO.getName());
            this.phone = billingDetailsDTO.getPhone();
    }
}

