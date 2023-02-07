package com.albatha.nexthealth.prescription.client;

import com.albatha.nexthealth.prescription.builders.PatientBuilder;
import com.albatha.nexthealth.prescription.domain.Patient;
import com.albatha.nexthealth.prescription.graphql.model.ErrorDTO;
import com.albatha.nexthealth.prescription.graphql.model.GraphqlResponse;
import com.albatha.nexthealth.prescription.graphql.model.MutationResponse;
import com.albatha.nexthealth.prescription.graphql.model.PatientMutationResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.test.annotation.DirtiesContext;

import java.io.IOException;
import java.util.ArrayList;

import static com.albatha.nexthealth.prescription.utils.CustomAssertions.shouldBeSame;

@EmbeddedKafka
@Slf4j
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PatientServiceClientTest {
    MockWebServer server = new MockWebServer();

    @Autowired
    PatientServiceClient patientServiceClient;

    @Autowired
    ObjectMapper customObjectMapper;

    @BeforeEach
    void init() throws IOException {
        server.shutdown();
    }
    @AfterEach
    void reset() throws IOException {
        server.shutdown();
    }

    void mockCreatePatientCall(GraphqlResponse<PatientMutationResponse> expectedResponse) throws IOException {
        MockResponse mockResponse = new MockResponse();
        mockResponse.addHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        mockResponse.setBody(customObjectMapper.writeValueAsString(expectedResponse));
        server.enqueue(mockResponse);
        server.start(3434);
    }

    @Test
    void shouldCreatePatient() throws Exception {
        Patient patient = new PatientBuilder().build();
        PatientInputDTO patientInputDTO = new PatientInputDTO(patient);

        GraphqlResponse<PatientMutationResponse> expectedResponse = new GraphqlResponse<PatientMutationResponse>(
            new ArrayList[]{},
            new PatientMutationResponse(
                new MutationResponse(true, null, null)
            )
        );
        mockCreatePatientCall(expectedResponse);

        GraphqlResponse<PatientMutationResponse> response = patientServiceClient.createPatient(patientInputDTO);

        Assertions.assertNotNull(response);
        shouldBeSame(expectedResponse, response);
    }

    @Test
    void shouldReturnExceptionWhenPatientServiceFails() throws IOException {
        Patient patient = new PatientBuilder().build();
        PatientInputDTO patientInputDTO = new PatientInputDTO(patient);
        GraphqlResponse<PatientMutationResponse> expectedResponse = new GraphqlResponse<PatientMutationResponse>(
            new ArrayList[]{},
            new PatientMutationResponse(
                new MutationResponse(
                    false, null, new ErrorDTO("500", "Internal server error")
                )
            )
        );

        mockCreatePatientCall(expectedResponse);

        Exception response = Assertions.assertThrows(Exception.class, () -> {
            patientServiceClient.createPatient(patientInputDTO);
        });

        Assertions.assertEquals("Unable to create Patient", response.getMessage());
    }

    @Test
    void shouldReturnExceptionWhenRequestTimesOut() throws Exception {
        Patient patient = new PatientBuilder().build();
        PatientInputDTO patientInputDTO = new PatientInputDTO(patient);
        server.start(3434);

        Exception response = Assertions.assertThrows(Exception.class, () -> {
            patientServiceClient.createPatient(patientInputDTO);
        });
        Assertions.assertTrue(response.getMessage().contains("Read timed out"));
    }
}
