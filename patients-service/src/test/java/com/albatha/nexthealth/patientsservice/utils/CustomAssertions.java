package com.albatha.nexthealth.patientsservice.utils;

import com.albatha.nexthealth.patientsservice.dto.PatientCreatedEvent;
import com.albatha.nexthealth.patientsservice.dto.PatientDTO;
import com.albatha.nexthealth.patientsservice.graphql.output.MutationResponse;
import com.albatha.nexthealth.patientsservice.model.Insurance;
import com.albatha.nexthealth.patientsservice.model.InsuranceProvider;
import com.albatha.nexthealth.patientsservice.model.Patient;
import org.junit.jupiter.api.Assertions;


public class CustomAssertions {

   public static void shouldBeSame(Patient expected, Patient actual) {
        Assertions.assertEquals(expected.getPatId(), actual.getPatId());
        Assertions.assertEquals(expected.getEmiratesId(), actual.getEmiratesId());
        Assertions.assertEquals(expected.getMohId(), actual.getMohId());
        Assertions.assertEquals(expected.getFirstName(), actual.getFirstName());
        Assertions.assertEquals(expected.getMiddleName(), actual.getMiddleName());
        Assertions.assertEquals(expected.getLastName(), actual.getLastName());
        Assertions.assertEquals(expected.getEmail(), actual.getEmail());
        Assertions.assertEquals(expected.getMobileNumber(), actual.getMobileNumber());
        Assertions.assertEquals(expected.getDob(), actual.getDob());
    }

    public static void shouldBeSame(Insurance expected, Insurance actual) {
        Assertions.assertEquals(expected.getInsId(), actual.getInsId());
        Assertions.assertEquals(expected.getPolicyNumber(), actual.getPolicyNumber());
        Assertions.assertEquals(expected.getNetwork(), actual.getNetwork());
        Assertions.assertEquals(expected.getInsuranceProvider(), actual.getInsuranceProvider());
    }

    public static void shouldBeSame(InsuranceProvider expected, InsuranceProvider actual) {
        Assertions.assertEquals(expected.getCode(), actual.getCode());
        Assertions.assertEquals(expected.getName(), actual.getName());
        Assertions.assertEquals(expected.getEClaimLinkId(), actual.getEClaimLinkId());
    }

    public static void shouldBeSame(MutationResponse expected, MutationResponse actual) {
        Assertions.assertEquals(expected.getSuccess(), actual.getSuccess());
        Assertions.assertEquals(expected.getError(), actual.getError());
        Assertions.assertEquals(expected.getData(), actual.getData());
    }

    public static void shouldBeSame(PatientDTO expected, PatientDTO actual) {
        Assertions.assertEquals(expected.getPatId(), actual.getPatId());
        Assertions.assertEquals(expected.getEmiratesId(), actual.getEmiratesId());
        Assertions.assertEquals(expected.getMohId(), actual.getMohId());
        Assertions.assertEquals(expected.getFirstName(), actual.getFirstName());
        Assertions.assertEquals(expected.getMiddleName(), actual.getMiddleName());
        Assertions.assertEquals(expected.getLastName(), actual.getLastName());
        Assertions.assertEquals(expected.getEmail(), actual.getEmail());
        Assertions.assertEquals(expected.getMobileNumber(), actual.getMobileNumber());
        Assertions.assertEquals(expected.getDob(), actual.getDob());
    }

    public static void shouldBeSame(PatientCreatedEvent expected, PatientCreatedEvent actual) {
        Assertions.assertEquals(expected.getEventType(), actual.getEventType());
        shouldBeSame(expected.getData(), actual.getData());
        Assertions.assertEquals(expected.getTopic(), actual.getTopic());
    }
}
