package com.albatha.nexthealth.prescription.repositories;

import com.albatha.nexthealth.prescription.builders.PatientBuilder;
import com.albatha.nexthealth.prescription.domain.Patient;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;

import static com.albatha.nexthealth.prescription.utils.CustomAssertions.shouldBeSame;

@EmbeddedKafka
@DirtiesContext
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PatientRepositoryTest {

    @Autowired
    private PatientRepository patientRepository;

    @BeforeEach
    void clean() {
        patientRepository.deleteAll();
    }

    @Test
    void shouldReturnNullWhenPatientDoesNotExistForGivenEmiratesId() {
        String randomEmiratesId = "784-2022-432422566-2";
        Patient patient = new PatientBuilder().build();

        patientRepository.save(patient);

        Patient response = patientRepository.findPatientByEmiratesId(randomEmiratesId);
        Assertions.assertNull(response);
    }

    @Test
    void shouldReturnPatientForGivenEmiratesId() {
        Patient patientAli = new PatientBuilder()
                .firstName("Ali")
                .emiratesId("784-2000-1234566-1")
                .build();

        Patient patientAhmed = new PatientBuilder()
                .firstName("Ahmed")
                .emiratesId("784-2000-1255236-23")
                .build();

        patientRepository.saveAll(List.of(patientAli, patientAhmed));

        Patient response = patientRepository.findPatientByEmiratesId(patientAli.getEmiratesId());
        shouldBeSame(patientAli, response);
    }
}
