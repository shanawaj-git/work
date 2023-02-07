package com.albatha.nexthealth.patientsservice.builders;

import com.albatha.nexthealth.patientsservice.defaultData.DefaultPatientData;
import com.albatha.nexthealth.patientsservice.model.Address;
import com.albatha.nexthealth.patientsservice.model.Insurance;
import com.albatha.nexthealth.patientsservice.model.Patient;

import java.sql.Timestamp;
import java.util.Set;
import java.util.UUID;


public class PatientBuilder {
    UUID patientId = DefaultPatientData.ID;
    String patId = DefaultPatientData.PAT_ID;
    String emiratesId = DefaultPatientData.EMIRATES_ID;
    String mohId = DefaultPatientData.MOH_ID;
    String firstName = DefaultPatientData.FIRST_NAME;
    String middleName = DefaultPatientData.MIDDLE_NAME;
    String lastName = DefaultPatientData.LAST_NAME;
    String email = DefaultPatientData.EMAIL;
    String mobileNumber = DefaultPatientData.MOBILE_NUMBER;
    Timestamp dateOfBirth = DefaultPatientData.DATE_OF_BIRTH;
    Set<Address> addresses = null;
    Set<Insurance> insurances = DefaultPatientData.insurances;
    Timestamp createdDate = DefaultPatientData.createdDate;

    public PatientBuilder insurance(Set<Insurance> insurance) {
        this.insurances = insurance;
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
