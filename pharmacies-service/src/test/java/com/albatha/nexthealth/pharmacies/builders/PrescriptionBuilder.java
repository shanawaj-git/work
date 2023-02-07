package com.albatha.nexthealth.pharmacies.builders;

import com.albatha.nexthealth.pharmacies.defaultData.DefaultPrescriptionData;
import com.albatha.nexthealth.pharmacies.model.PrescribedDrug;
import com.albatha.nexthealth.pharmacies.model.Prescription;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

public class PrescriptionBuilder {
    UUID prescriptionId = UUID.randomUUID();
    String prescriptionNumber = DefaultPrescriptionData.PRESCRIPTION_NUMBER;
    List<PrescribedDrug> prescribedDrugs = Collections.emptyList();

    public PrescriptionBuilder prescribedDrugs(List<PrescribedDrug> prescribedDrugs) {
        this.prescribedDrugs = prescribedDrugs;
        return this;
    }

    public Prescription build() {
        return new Prescription(
            prescriptionId,
            prescriptionNumber,
            prescribedDrugs
        );
    }
}
