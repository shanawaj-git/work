package com.albatha.nexthealth.patientsservice.repositories;


import com.albatha.nexthealth.patientsservice.builders.InsuranceBuilder;
import com.albatha.nexthealth.patientsservice.builders.InsuranceProviderBuilder;
import com.albatha.nexthealth.patientsservice.builders.PatientBuilder;
import com.albatha.nexthealth.patientsservice.model.Insurance;
import com.albatha.nexthealth.patientsservice.model.InsuranceProvider;
import com.albatha.nexthealth.patientsservice.model.Patient;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.*;

import static com.albatha.nexthealth.patientsservice.utils.CustomAssertions.shouldBeSame;


@DirtiesContext()
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PatientRepositoryTest {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private InsuranceRepository insuranceRepository;

    @Autowired
    private InsuranceProviderRepository insuranceProviderRepository;

    @BeforeEach
    void clean() {
        patientRepository.deleteAll();
    }

    InsuranceProvider insuranceProvider = new InsuranceProviderBuilder().build();
    Insurance insurance = new InsuranceBuilder()
            .provider(insuranceProvider)
            .build();
    Patient patient = new PatientBuilder()
            .insurance(Set.of(insurance))
            .build();

    @Test
    void shouldSavePatientAlongWithInsuranceAndProvider() {
        patientRepository.save(patient);

        Patient response = patientRepository.findAll().get(0);
        Insurance insuranceResponse = insuranceRepository.findAll().get(0);
        InsuranceProvider insuranceProviderResponse = insuranceProviderRepository.findAll().get(0);

        shouldBeSame(patient, response);
        shouldBeSame(insurance, insuranceResponse);
        shouldBeSame(insuranceProvider, insuranceProviderResponse);
    }

    @Test
    void shouldSavePatientAlongWithoutInsuranceDetails() {
        patient.setInsuranceSet(null);
        patientRepository.save(patient);

        Patient response = patientRepository.findAll().get(0);
        List<Insurance> insuranceResponse = insuranceRepository.findAll();
        List<InsuranceProvider> insuranceProviderResponse = insuranceProviderRepository.findAll();

        shouldBeSame(patient, response);
        Assertions.assertEquals(0, insuranceResponse.size());
        Assertions.assertEquals(0, insuranceProviderResponse.size());
    }
}
