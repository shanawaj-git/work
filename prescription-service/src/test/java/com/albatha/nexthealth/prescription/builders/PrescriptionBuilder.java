package com.albatha.nexthealth.prescription.builders;

import com.albatha.nexthealth.prescription.defaultData.DefaultPrescriptionData;
import com.albatha.nexthealth.prescription.domain.Facility;
import com.albatha.nexthealth.prescription.domain.Insurance;
import com.albatha.nexthealth.prescription.domain.Patient;
import com.albatha.nexthealth.prescription.domain.Prescription;
import com.albatha.nexthealth.prescription.domain.PrescribedDrug;
import com.albatha.nexthealth.prescription.domain.Doctor;
import java.sql.Timestamp;
import java.util.Set;

public class PrescriptionBuilder {
    Long prescriptionId = DefaultPrescriptionData.ID;
    String prescriptionNumber = DefaultPrescriptionData.PRESCRIPTION_NUMBER;
    String recordNumber = DefaultPrescriptionData.RECORD_NUMBER;
    Timestamp visitDate = DefaultPrescriptionData.VISIT_DATE;
    String diagnosis = DefaultPrescriptionData.DIAGNOSIS;
    String pin = DefaultPrescriptionData.PIN;
    Patient patient = DefaultPrescriptionData.PATIENT;
    Doctor doctor = DefaultPrescriptionData.DOCTOR;
    Facility sendingFacility = DefaultPrescriptionData.SENDING_FACILITY;
    Insurance insurance =  DefaultPrescriptionData.INSURANCE;
    Set<PrescribedDrug> prescribedDrugs = DefaultPrescriptionData.PRESCRIBED_DRUGS;
    Timestamp createdDate;

    public PrescriptionBuilder insurance(Insurance insurance) {
        this.insurance = insurance;
        return this;
    }

    public PrescriptionBuilder doctor(Doctor doctor) {
        this.doctor = doctor;
        return this;
    }

    public PrescriptionBuilder prescribedDrugs(Set<PrescribedDrug> prescribedDrugs) {
        this.prescribedDrugs = prescribedDrugs;
        return this;
    }

    public PrescriptionBuilder sendingFacility(Facility sendingFacility) {
        this.sendingFacility = sendingFacility;
        return this;
    }

    public PrescriptionBuilder patient(Patient patient) {
        this.patient = patient;
        return this;
    }

    public PrescriptionBuilder prescriptionNumber(String prescriptionNumber) {
        this.prescriptionNumber = prescriptionNumber;
        return this;
    }

    public Prescription build() {
        return new Prescription(
            prescriptionId,
            prescriptionNumber,
            recordNumber,
            visitDate,
            diagnosis,
            pin,
            patient,
            doctor,
            sendingFacility,
            insurance,
            prescribedDrugs,
            createdDate
        );
    }
}
