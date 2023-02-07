package com.albatha.nexthealth.patientsservice.builders;

import com.albatha.nexthealth.patientsservice.defaultData.DefaultPatientData;
import com.albatha.nexthealth.patientsservice.graphql.input.PatientInput;
import com.albatha.nexthealth.patientsservice.graphql.input.InsuranceInput;
import com.albatha.nexthealth.patientsservice.model.Address;

import java.sql.Timestamp;
import java.time.OffsetDateTime;
import java.util.Set;

public class PatientInputBuilder {
    String patId = DefaultPatientData.PAT_ID;
    String emiratesId = DefaultPatientData.EMIRATES_ID;
    String mohId = DefaultPatientData.MOH_ID;
    String firstName = DefaultPatientData.FIRST_NAME;
    String middleName = DefaultPatientData.MIDDLE_NAME;
    String lastName = DefaultPatientData.LAST_NAME;
    String email = DefaultPatientData.EMAIL;
    String mobileNumber = DefaultPatientData.MOBILE_NUMBER;
    OffsetDateTime dob = DefaultPatientData.DATE_OF_BIRTH_OFFSET;
    Set<Address> addresses = null;
    Set<InsuranceInput> insurances = null;
    Timestamp createdDate = DefaultPatientData.createdDate;

    public PatientInputBuilder insurance(Set<InsuranceInput> insuranceInputs) {
        this.insurances = insuranceInputs;
        return this;
    }
    public PatientInput build() {
        return new PatientInput(
                patId,
                emiratesId,
                mohId,
                firstName,
                middleName,
                lastName,
                email,
                mobileNumber,
                dob,
                insurances
        );
    }
}
