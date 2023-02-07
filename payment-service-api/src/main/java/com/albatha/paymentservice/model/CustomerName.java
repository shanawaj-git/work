package com.albatha.paymentservice.model;

import com.albatha.paymentservice.dto.CustomerNameDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerName {
    @NotNull
    private String firstName;
    private String middleName;
    @NotNull
    private String lastName;
    private String salutation;

    public CustomerName(CustomerNameDTO nameDTO) {
        this.firstName =nameDTO.getFirstName();
        this.middleName = nameDTO.getMiddleName();
        this.lastName =nameDTO.getLastName();
    }
}
