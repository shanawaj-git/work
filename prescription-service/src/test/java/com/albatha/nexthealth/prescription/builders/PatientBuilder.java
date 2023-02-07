package com.albatha.nexthealth.prescription.builders;

import com.albatha.nexthealth.prescription.defaultData.DefaultPatientData;
import com.albatha.nexthealth.prescription.domain.Address;
import com.albatha.nexthealth.prescription.domain.Insurance;
import com.albatha.nexthealth.prescription.domain.Patient;

import java.sql.Timestamp;
import java.util.Set;

public class PatientBuilder {
    Long patientId = DefaultPatientData.ID;
    String patId = DefaultPatientData.PAT_ID;
    String emiratesId = DefaultPatientData.EMIRATES_ID;
    String mohId = DefaultPatientData.MOH_ID;
    String firstName = DefaultPatientData.FIRST_NAME;
    String middleName = DefaultPatientData.MIDDLE_NAME;
    String lastName = DefaultPatientData.LAST_NAME;
    String email = DefaultPatientData.EMAIL;
    String mobileNumber = DefaultPatientData.MOBILE_NUMBER;
    Timestamp dateOfBirth = DefaultPatientData.DATE_OF_BIRTH;
    Set<Address> addresses = DefaultPatientData.ADDRESSES;
    Set<Insurance> insurances = DefaultPatientData.insurances;
    Timestamp createdDate = DefaultPatientData.createdDate;

    public PatientBuilder firstName(String firstName) {
        this.emiratesId = firstName;
        return this;
    }

    public PatientBuilder emiratesId(String emiratesId) {
        this.emiratesId = emiratesId;
        return this;
    }

    public Patient build() {
        return new Patient(
            patientId,
            patId,
            emiratesId,
            mohId,
            firstName,
            middleName,
            lastName,
            email,
            mobileNumber,
            dateOfBirth,
            addresses,
            insurances,
            createdDate
        );
    }
}
