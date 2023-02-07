package com.albatha.nexthealth.patientsservice.services;

import com.albatha.nexthealth.patientsservice.dto.AddressDTO;
import com.albatha.nexthealth.patientsservice.graphql.input.CreatePatientAddressInput;
import com.albatha.nexthealth.patientsservice.model.Address;
import com.albatha.nexthealth.patientsservice.services.exception.PatientNotFoundException;

import java.util.UUID;

public interface PatientAddressService {

    public Address addPatientAddress(String emiratesId, AddressDTO createAddressInput) throws PatientNotFoundException;

}
