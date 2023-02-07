package com.albatha.nexthealth.patientsservice.graphql.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePatientAddressInput {
    private String flatVillaNumber;
    private String buildingName;
    private String formattedText;
    @Size(max = 255)
    private String userNotes;
    private String area;
    private String city;
    private String state;
    private String postalCode;
    private String type;
    private String country;
    private double latitude;
    private double longitude;
}

