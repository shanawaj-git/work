package com.albatha.nexthealth.prescription.service;

import com.albatha.nexthealth.prescription.domain.Prescription;

public interface PrescribedDrugService {
    void addOrUpdatePrescriptionDrug(Prescription prescription);
}
