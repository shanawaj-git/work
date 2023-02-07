package com.albatha.nexthealth.patientsservice.graphql.service.impl;

import com.albatha.nexthealth.patientsservice.builders.PatientInputBuilder;
import com.albatha.nexthealth.patientsservice.builders.PatientBuilder;
import com.albatha.nexthealth.patientsservice.constants.EventType;
import com.albatha.nexthealth.patientsservice.constants.Topic;
import com.albatha.nexthealth.patientsservice.dto.PatientCreatedEvent;
import com.albatha.nexthealth.patientsservice.dto.PatientDTO;
import com.albatha.nexthealth.patientsservice.graphql.input.PatientInput;
import com.albatha.nexthealth.patientsservice.kafka.producer.EventProducer;
import com.albatha.nexthealth.patientsservice.model.Patient;
import com.albatha.nexthealth.patientsservice.repositories.PatientRepository;
import com.albatha.nexthealth.patientsservice.services.impl.PatientServiceImpl;
import com.albatha.nexthealth.patientsservice.transformer.PatientMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.doNothing;

@ExtendWith(MockitoExtension.class)
class CreatePatientServiceImplTest {
    @Mock
    PatientMapper patientMapper;
    @Mock
    PatientRepository patientRepository;
    @Mock
    EventProducer eventProducer;

    @InjectMocks
    PatientServiceImpl patientService;

    @Test
    void shouldCreatePatientForGivenPatientInput() {
        PatientInput input = new PatientInputBuilder().build();
        Patient patient = new PatientBuilder().build();
        PatientCreatedEvent patientCreatedEvent = new PatientCreatedEvent(Topic.PATIENTS.label,
                EventType.NEW_PATIENT.label, new PatientDTO(patient));

        Mockito.when(patientMapper.convertPatientInputToEntity(input)).thenReturn(patient);
        Mockito.when(patientRepository.save(patient)).thenReturn(patient);
        doNothing().when(eventProducer).produce(patientCreatedEvent);

        patientService.createPatient(input);

        Mockito.verify(patientRepository, Mockito.times(1)).save(patient);
        Mockito.verify(eventProducer, Mockito.times(1)).produce(patientCreatedEvent);
    }
}
