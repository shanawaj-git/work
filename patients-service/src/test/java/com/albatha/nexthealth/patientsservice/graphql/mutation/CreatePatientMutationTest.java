package com.albatha.nexthealth.patientsservice.graphql.mutation;

import com.albatha.nexthealth.patientsservice.builders.PatientBuilder;
import com.albatha.nexthealth.patientsservice.config.GraphQLConfiguration;
import com.albatha.nexthealth.patientsservice.dto.Event;
import com.albatha.nexthealth.patientsservice.dto.PatientDTO;
import com.albatha.nexthealth.patientsservice.graphql.output.MutationResponse;
import com.albatha.nexthealth.patientsservice.model.Patient;
import com.albatha.nexthealth.patientsservice.repositories.PatientAddressRepository;
import com.albatha.nexthealth.patientsservice.repositories.PatientRepository;
import com.albatha.nexthealth.patientsservice.services.PatientService;
import com.graphql.spring.boot.test.GraphQLResponse;
import com.graphql.spring.boot.test.GraphQLTest;
import com.graphql.spring.boot.test.GraphQLTestTemplate;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;

import java.io.IOException;

import static com.albatha.nexthealth.patientsservice.utils.CustomAssertions.shouldBeSame;
import static org.junit.jupiter.api.Assertions.assertTrue;


@GraphQLTest
@DirtiesContext
@ComponentScan("com.albatha.nexthealth.patientsservice")
@ContextConfiguration(classes = GraphQLConfiguration.class)
@EmbeddedKafka(topics = "TOPIC_PATIENT")
class CreatePatientMutationTest {

    @MockBean
    PatientService patientService;

    @MockBean
    KafkaTemplate<String, Event<?>> kafkaTemplate;

    @MockBean
    PatientRepository patientRepository;

    @MockBean
    PatientAddressRepository patientAddressRepository;

    @Autowired
    private GraphQLTestTemplate graphQLTestTemplate;

    Patient patient = new PatientBuilder().build();

    private GraphQLResponse createPatientMutation() throws IOException {
        return graphQLTestTemplate.postForResource("graphql/create_patient.graphql");
    }

    private MutationResponse getCreatePatientMutationResponse(GraphQLResponse response) {
        return response.get("$.data.createPatient", MutationResponse.class);
    }

    @Test
    void shouldReturnSuccessfulResponseWhenPatientIsCreated() throws IOException {
        Mockito.when(patientService.createPatient(Mockito.any())).thenReturn(patient);
        MutationResponse<?> expectedResponse = new MutationResponse<PatientDTO>(true, null, null);

        GraphQLResponse response = createPatientMutation();
        MutationResponse<?> mutationResponse = getCreatePatientMutationResponse(response);

        assertTrue(response.isOk());
        shouldBeSame(expectedResponse, mutationResponse);
    }

    @Test
    void shouldReturnFailureResponseWhenPatientIsNotCreated() throws IOException {
        Mockito.when(patientService.createPatient(Mockito.any())).thenReturn(null);
        MutationResponse<?> expectedResponse = new MutationResponse<PatientDTO>(false, null, null);

        GraphQLResponse response = createPatientMutation();
        MutationResponse<?> mutationResponse = getCreatePatientMutationResponse(response);

        assertTrue(response.isOk());
        shouldBeSame(expectedResponse, mutationResponse);
    }
}
