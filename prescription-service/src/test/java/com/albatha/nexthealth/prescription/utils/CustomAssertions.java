package com.albatha.nexthealth.prescription.utils;

import com.albatha.nexthealth.prescription.graphql.model.GraphqlResponse;
import com.albatha.nexthealth.prescription.graphql.model.MutationResponse;
import com.albatha.nexthealth.prescription.graphql.model.PatientMutationResponse;
import com.albatha.nexthealth.prescription.domain.Drug;
import com.albatha.nexthealth.prescription.domain.Facility;
import com.albatha.nexthealth.prescription.domain.Insurance;
import com.albatha.nexthealth.prescription.domain.Patient;
import com.albatha.nexthealth.prescription.domain.Prescription;
import com.albatha.nexthealth.prescription.domain.PrescribedDrug;
import com.albatha.nexthealth.prescription.domain.Doctor;
import com.albatha.nexthealth.prescription.graphql.model.PatientDTO;
import org.junit.jupiter.api.Assertions;

import java.sql.Timestamp;
import java.time.temporal.ChronoUnit;

public class CustomAssertions {
    public static void shouldBeSame(Facility expected, Facility actual) {
        Assertions.assertEquals(expected.getFacId(), actual.getFacId());
        Assertions.assertEquals(expected.getName(), actual.getName());
        Assertions.assertEquals(expected.getAddress(), actual.getAddress());
    }

    public static void shouldBeSame(Drug expected, Drug actual) {
        Assertions.assertEquals(expected.getName(), actual.getName());
        Assertions.assertEquals(expected.getCode(), actual.getCode());
    }

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
        shouldBeSame(expected.getExpiryDate(), actual.getExpiryDate());
        Assertions.assertEquals(expected.getProvider(), actual.getProvider());
    }

    public static void shouldBeSame(Doctor expected, Doctor actual) {
        Assertions.assertEquals(expected.getEmail(), actual.getEmail());
        Assertions.assertEquals(expected.getFirstName(), actual.getFirstName());
        Assertions.assertEquals(expected.getMiddleName(), actual.getMiddleName());
        Assertions.assertEquals(expected.getLastName(), actual.getLastName());
        Assertions.assertEquals(expected.getMobileNumber(), actual.getMobileNumber());
    }

    public static void shouldBeSame(PrescribedDrug expected, PrescribedDrug actual) {
        Assertions.assertEquals(expected.getDoctorNotes(), actual.getDoctorNotes());
        Assertions.assertEquals(expected.getFrequency(), actual.getFrequency());
        Assertions.assertEquals(expected.getPeriod(), actual.getPeriod());
        Assertions.assertEquals(expected.getTimeUnit(), actual.getTimeUnit());
        Assertions.assertEquals(expected.getDrug(), actual.getDrug());
    }

    public static void shouldBeSame(Timestamp expected, Timestamp actual) {
        Assertions.assertEquals(
            expected.toInstant().truncatedTo(ChronoUnit.MINUTES),
            actual.toInstant().truncatedTo(ChronoUnit.MINUTES)
        );
    }

    public static void shouldBeSame(Prescription expected, Prescription actual) {
        shouldBeSame(expected.getPatient(), actual.getPatient());
        shouldBeSame(expected.getDoctor(), actual.getDoctor());
        shouldBeSame(expected.getInsurance(), actual.getInsurance());
        shouldBeSame(expected.getSendingFacility(), actual.getSendingFacility());
        Assertions.assertEquals(expected.getDiagnosis(), actual.getDiagnosis());
        Assertions.assertEquals(expected.getPrescriptionNumber(), actual.getPrescriptionNumber());
        Assertions.assertEquals(expected.getPin(), actual.getPin());
        shouldBeSame(expected.getVisitDate(), actual.getVisitDate());
    }

    public static void shouldBeSame(PatientDTO expected, PatientDTO actual) {
        Assertions.assertEquals(expected.getName(), actual.getName());
        Assertions.assertEquals(expected.getEmail(), actual.getEmail());
        Assertions.assertEquals(expected.getMobileNumber(), actual.getMobileNumber());
        Assertions.assertEquals(expected.getMohId(), actual.getMohId());
        Assertions.assertEquals(expected.getDob(), actual.getDob());
        Assertions.assertEquals(expected.getPatientId(), actual.getPatientId());
        Assertions.assertEquals(expected.getEmiratesId(), actual.getEmiratesId());
    }

    public static void shouldBeSame(MutationResponse expected, MutationResponse actual) {
        Assertions.assertEquals(expected.getSuccess(), actual.getSuccess());
        Assertions.assertEquals(expected.getData(), actual.getData());
        Assertions.assertEquals(expected.getError(), actual.getError());
    }

    public static void shouldBeSame(GraphqlResponse<PatientMutationResponse> expected, GraphqlResponse<PatientMutationResponse> actual) {
        shouldBeSame(expected.getData().getCreatePatient(), actual.getData().getCreatePatient());
    }
}
