package com.albatha.nexthealth.prescription.service;

import com.albatha.nexthealth.prescription.domain.Prescription;

public interface PrescriptionService {
    void persistPrescription(Prescription prescription) throws Exception;
}
