package com.albatha.nexthealth.patientsservice.graphql.mutation;

import com.albatha.nexthealth.patientsservice.builders.PatientAddressBuilder;
import com.albatha.nexthealth.patientsservice.config.GraphQLConfiguration;
import com.albatha.nexthealth.patientsservice.dto.AddressDTO;
import com.albatha.nexthealth.patientsservice.dto.Event;
import com.albatha.nexthealth.patientsservice.graphql.error.PatientServiceErrors;
import com.albatha.nexthealth.patientsservice.graphql.output.ErrorDTO;
import com.albatha.nexthealth.patientsservice.graphql.output.MutationResponse;
import com.albatha.nexthealth.patientsservice.model.Address;
import com.albatha.nexthealth.patientsservice.repositories.PatientAddressRepository;
import com.albatha.nexthealth.patientsservice.repositories.PatientRepository;
import com.albatha.nexthealth.patientsservice.services.PatientAddressService;
import com.albatha.nexthealth.patientsservice.services.exception.PatientNotFoundException;
import com.graphql.spring.boot.test.GraphQLResponse;
import com.graphql.spring.boot.test.GraphQLTest;
import com.graphql.spring.boot.test.GraphQLTestTemplate;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;


import java.io.IOException;

import static org.assertj.core.error.ShouldBeSame.shouldBeSame;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;


@GraphQLTest
@DirtiesContext
@ComponentScan("com.albatha.nexthealth.patientsservice")
@ContextConfiguration(classes = GraphQLConfiguration.class)
@EmbeddedKafka(topics = "TOPIC_PATIENT")
class PatientAddressMutationTest {

    @MockBean
    PatientAddressService patientAddressService;

    @MockBean
    KafkaTemplate<String, Event<?>> kafkaTemplate;

    @MockBean
    PatientRepository patientRepository;

    @MockBean
    PatientAddressRepository patientAddressRepository;

    @Autowired
    private GraphQLTestTemplate graphQLTestTemplate;

    Address address = new PatientAddressBuilder().build();

    private GraphQLResponse createPatientAddressMutation() throws IOException {
        return graphQLTestTemplate.postForResource("graphql/create_address.graphqls");
    }

    private MutationResponse<AddressDTO> getCreatePatientAddressMutationResponse(GraphQLResponse response) {
        return response.get("$.data.addPatientAddress", MutationResponse.class);
    }

    @Test
    void shouldReturnSuccessfulResponseWhenPatientAddresssIsCreated() throws IOException, PatientNotFoundException {
        when(patientAddressService.addPatientAddress(anyString(), any(AddressDTO.class))).thenReturn(address);
        MutationResponse expectedResponse = new MutationResponse(true, new ModelMapper().map(address, AddressDTO.class), null);
        GraphQLResponse response = createPatientAddressMutation();
        MutationResponse<AddressDTO> mutationResponse = getCreatePatientAddressMutationResponse(response);
        assertTrue(response.isOk());
        shouldBeSame(expectedResponse, mutationResponse);
    }

    @Test
    void shouldReturnFailureResponsewhenPatientDoesNotExist() throws IOException, PatientNotFoundException {
        when(patientAddressService.addPatientAddress(anyString(), any(AddressDTO.class))).thenThrow(new PatientNotFoundException());
        MutationResponse expectedResponse = new MutationResponse(false, null, new ErrorDTO(PatientServiceErrors.NOT_FOUND.code, PatientServiceErrors.NOT_FOUND.message));

        GraphQLResponse response = createPatientAddressMutation();
        MutationResponse mutationResponse = getCreatePatientAddressMutationResponse(response);

        assertTrue(response.isOk());
        shouldBeSame(expectedResponse, mutationResponse);
    }
}
