package com.albatha.nexthealth.patientsservice.services;


import com.albatha.nexthealth.patientsservice.graphql.input.PatientInput;
import com.albatha.nexthealth.patientsservice.model.Patient;

public interface PatientService {
    Patient createPatient(PatientInput patientInput);
}
