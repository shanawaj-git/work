package com.albatha.paymentservice.model;
import com.albatha.paymentservice.dto.AddressDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @NotNull
    private String line1;
    @NotNull
    private String line2;
    @NotNull
    private String city;

    private String postalCode;
    private String country;
    private String state;

    public Address(AddressDTO addressDTO)
    {
        this.city=addressDTO.getCity() ;
        this.line1=addressDTO.getLine1();
        this.line2=addressDTO.getLine2();
        this.postalCode=addressDTO.getPostalCode();
        this.country=addressDTO.getCountry();
        this.state=addressDTO.getState();
    }
}
