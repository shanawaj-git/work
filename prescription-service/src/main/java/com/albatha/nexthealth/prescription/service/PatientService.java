package com.albatha.nexthealth.prescription.service;

import com.albatha.nexthealth.prescription.domain.Prescription;

public interface PatientService {
    void addOrUpdatePatient(Prescription prescription);
}
