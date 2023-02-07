package com.albatha.nexthealth.prescription.service.impl;

import com.albatha.nexthealth.prescription.builders.PrescriptionBuilder;
import com.albatha.nexthealth.prescription.builders.PatientBuilder;
import com.albatha.nexthealth.prescription.client.PatientServiceClient;
import com.albatha.nexthealth.prescription.graphql.model.MutationResponse;
import com.albatha.nexthealth.prescription.graphql.model.GraphqlResponse;
import com.albatha.nexthealth.prescription.client.PatientInputDTO;
import com.albatha.nexthealth.prescription.graphql.model.PatientMutationResponse;
import com.albatha.nexthealth.prescription.domain.Patient;
import com.albatha.nexthealth.prescription.domain.Prescription;
import com.albatha.nexthealth.prescription.repositories.PatientRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.test.annotation.DirtiesContext;

import java.util.ArrayList;


@EmbeddedKafka
@DirtiesContext
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PatientServiceImplTest {

    @MockBean
    PatientRepository patientRepository;

    @MockBean
    PatientServiceClient patientServiceClient;

    @Autowired
    PatientServiceImpl patientService;

    Patient patient = new PatientBuilder().build();

    Prescription prescription = new PrescriptionBuilder()
        .patient(patient)
        .build();

    @Test
    void shouldAddPatientToPrescriptionWhenPatientExists() throws Exception {
        Mockito.when(
            patientRepository.findPatientByEmiratesId(
                prescription.getPatient().getEmiratesId()
            )
        ).thenReturn(patient);

        patientService.addOrUpdatePatient(prescription);
        Mockito.verify(patientRepository, Mockito.times(0)).save(patient);
    }

    @Test
    void shouldCreatePatientAndAddItToPrescriptionWhenPatientDoesNotExist() throws Exception {
        PatientInputDTO patientInput = new PatientInputDTO(patient);
        GraphqlResponse<PatientMutationResponse> graphqlResponse = new GraphqlResponse<PatientMutationResponse>(
            new ArrayList[]{},
            new PatientMutationResponse(
                new MutationResponse(true, null, null)
            )
        );

        Mockito.when(
            patientRepository.findPatientByEmiratesId(
                prescription.getPatient().getEmiratesId()
            )
        ).thenReturn(null);
        Mockito.when(
            patientServiceClient.createPatient(patientInput)
        ).thenReturn(graphqlResponse);

        patientService.addOrUpdatePatient(prescription);

        Mockito.verify(patientServiceClient, Mockito.times(1)).createPatient(Mockito.any());
    }
}
