package com.albatha.nexthealth.patientsservice.graphql.mutation;

import com.albatha.nexthealth.patientsservice.dto.AddressDTO;
import com.albatha.nexthealth.patientsservice.graphql.error.PatientServiceErrors;
import com.albatha.nexthealth.patientsservice.graphql.input.CreatePatientAddressInput;
import com.albatha.nexthealth.patientsservice.graphql.output.ErrorDTO;
import com.albatha.nexthealth.patientsservice.graphql.output.MutationResponse;
import com.albatha.nexthealth.patientsservice.kafka.producer.EventProducer;
import com.albatha.nexthealth.patientsservice.model.Address;
import com.albatha.nexthealth.patientsservice.services.PatientAddressService;
import com.albatha.nexthealth.patientsservice.services.exception.PatientNotFoundException;
import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class PatientAddressMutation implements GraphQLMutationResolver {

    final PatientAddressService patientAddressService;
    final EventProducer eventProducer;
    final ModelMapper customModelMapper;

    public PatientAddressMutation(PatientAddressService patientAddressService, EventProducer eventProducer, ModelMapper customModelMapper) {
        this.patientAddressService = patientAddressService;
        this.eventProducer = eventProducer;
        this.customModelMapper = customModelMapper;
    }

    public MutationResponse<AddressDTO> addPatientAddress(String emiratesId, CreatePatientAddressInput createPatientAddressInput) {
        try {
            log.info("create patient address input {}", createPatientAddressInput);
            Address patientAddress = patientAddressService.addPatientAddress(emiratesId, customModelMapper.map(createPatientAddressInput, AddressDTO.class));
            return createSuccessfulAddressResponse(patientAddress);
        } catch (PatientNotFoundException e) {
            return createFailureAddressResponse();
        }
    }

    private MutationResponse<AddressDTO> createSuccessfulAddressResponse(Address patientAddress) {
        AddressDTO mappedAddress = customModelMapper.map(patientAddress, AddressDTO.class);
        return new MutationResponse<>(true, mappedAddress, null);
    }

    private MutationResponse<AddressDTO> createFailureAddressResponse() {
        return new MutationResponse<>(false, null,
                new ErrorDTO(PatientServiceErrors.NOT_FOUND.code, PatientServiceErrors.NOT_FOUND.message));
    }
}

