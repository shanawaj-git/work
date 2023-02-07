package com.albatha.nexthealth.patientsservice.transformer;

import com.albatha.nexthealth.patientsservice.graphql.input.PatientInput;
import com.albatha.nexthealth.patientsservice.model.Patient;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class PatientMapper {

    final ModelMapper modelMapper ;

    public PatientMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public Patient convertPatientInputToEntity(PatientInput patientInput) {
        return modelMapper.map(patientInput, Patient.class);

    }
}
