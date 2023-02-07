package com.albatha.nexthealth.pharmacies.builders;

import com.albatha.nexthealth.pharmacies.model.Dosage;
import com.albatha.nexthealth.pharmacies.model.Drug;
import com.albatha.nexthealth.pharmacies.model.PrescribedDrug;

public class PrescribedDrugBuilder {
    public Dosage dosage = null;
    public Drug drug = null;

    public PrescribedDrugBuilder dosage(Dosage dosage) {
        this.dosage = dosage;
        return this;
    }

    public PrescribedDrugBuilder drug(Drug drug) {
        this.drug = drug;
        return this;
    }

    public PrescribedDrug build() {
        return new PrescribedDrug(
            drug,
            dosage
        );
    }
}
