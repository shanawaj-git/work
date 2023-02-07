package com.albatha.nexthealth.prescription.builders;

import com.albatha.nexthealth.prescription.defaultData.DefaultPrescribedDrugData;
import com.albatha.nexthealth.prescription.domain.Drug;
import com.albatha.nexthealth.prescription.domain.PrescribedDrug;
import com.albatha.nexthealth.prescription.domain.Prescription;

import java.sql.Timestamp;

public class PrescribedDrugBuilder {
    public Long prescribedDrugId = DefaultPrescribedDrugData.PRESCRIBED_DRUG_ID;
    public String frequency = DefaultPrescribedDrugData.FREQUENCY;
    public String unit = DefaultPrescribedDrugData.UNIT;
    public String period = DefaultPrescribedDrugData.PERIOD;
    public String route = DefaultPrescribedDrugData.ROUTE;
    public String quantity = DefaultPrescribedDrugData.QUANTITY;
    public String doctorNotes = DefaultPrescribedDrugData.DOCTOR_NOTES;
    public String timeUnit = DefaultPrescribedDrugData.TIME_UNIT;
    public Prescription prescription = null;
    public Drug drug = null;
    public Timestamp createdDate = DefaultPrescribedDrugData.CREATED_DATE;

    public PrescribedDrugBuilder prescription(Prescription prescription) {
        this.prescription = prescription;
        return this;
    }

    public PrescribedDrugBuilder drug(Drug drug) {
        this.drug = drug;
        return this;
    }

    public PrescribedDrug build() {
        return new PrescribedDrug(
            prescribedDrugId,
            frequency,
            unit,
            period,
            route,
            quantity,
            doctorNotes,
            timeUnit,
            prescription,
            drug,
            createdDate
        );
    }
}
