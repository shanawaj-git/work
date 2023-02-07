package com.albatha.nexthealth.patientsservice.builders;

import com.albatha.nexthealth.patientsservice.builders.PatientBuilder;
import com.albatha.nexthealth.patientsservice.defaultData.DefaultPatientAddressData;
import com.albatha.nexthealth.patientsservice.model.Address;
import com.albatha.nexthealth.patientsservice.model.Patient;

import java.sql.Timestamp;
import java.util.UUID;

public class PatientAddressBuilder {
    public UUID addressId = DefaultPatientAddressData.ADDRESS_ID;
    public String flatVillaNumber = DefaultPatientAddressData.FLAT_VILLA_NUMBER;
    public String buildingName = DefaultPatientAddressData.BUILDING_NAME;
    public String userNotes = DefaultPatientAddressData.USER_NOTES;
    public String formattedText = DefaultPatientAddressData.FORMATTED_TEXT;
    public Patient patient = new PatientBuilder().build();
    private double latitude = DefaultPatientAddressData.LATITUDE;
    private double longitude = DefaultPatientAddressData.LONGITUDE;
    public String area = DefaultPatientAddressData.AREA;
    public String city = DefaultPatientAddressData.CITY;
    public String state = DefaultPatientAddressData.STATE;
    public String postalCode = DefaultPatientAddressData.POSTAL_CODE;
    public String type = DefaultPatientAddressData.TYPE;
    public String country = DefaultPatientAddressData.COUNTRY;
    public Timestamp createdDate = DefaultPatientAddressData.CREATED_DATE;


    public Address build() {
        return new Address(addressId, patient, flatVillaNumber, buildingName, formattedText, area, city, state, userNotes, postalCode, type, country, latitude, longitude,
                createdDate);
    }
}
