package com.albatha.nexthealth.patientsservice.dto;

import com.albatha.nexthealth.patientsservice.model.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressDTO {
    private UUID addressId;
    private String flatVillaNumber;
    private String buildingName;
    private String formattedText;
    private String userNotes;
    private String area;
    private String city;
    private String state;
    private String postalCode;
    private String type;
    private String country;
    private double latitude;
    private double longitude;

    public AddressDTO(Address address) {
        this.addressId = address.getAddressId();
        this.flatVillaNumber = address.getFlatVillaNumber();
        this.buildingName = address.getBuildingName();
        this.formattedText = address.getFormattedText();
        this.userNotes = address.getUserNotes();
        this.area = address.getArea();
        this.city = address.getCity();
        this.state = address.getState();
        this.postalCode = address.getPostalCode();
        this.type = address.getType();
        this.country = address.getCountry();
        this.latitude = address.getLatitude();
        this.longitude = address.getLongitude();
    }
}