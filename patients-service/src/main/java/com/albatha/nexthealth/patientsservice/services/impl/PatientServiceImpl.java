package com.albatha.nexthealth.patientsservice.services.impl;


import com.albatha.nexthealth.patientsservice.constants.EventType;
import com.albatha.nexthealth.patientsservice.constants.Topic;
import com.albatha.nexthealth.patientsservice.dto.PatientDTO;
import com.albatha.nexthealth.patientsservice.dto.PatientCreatedEvent;
import com.albatha.nexthealth.patientsservice.graphql.input.PatientInput;
import com.albatha.nexthealth.patientsservice.kafka.producer.EventProducer;
import com.albatha.nexthealth.patientsservice.model.Patient;
import com.albatha.nexthealth.patientsservice.repositories.PatientRepository;
import com.albatha.nexthealth.patientsservice.services.PatientService;
import com.albatha.nexthealth.patientsservice.transformer.PatientMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PatientServiceImpl implements PatientService {

    static final String PATIENT_TOPIC = Topic.PATIENTS.label;
    static final String PATIENT_CREATED_EVENT = EventType.NEW_PATIENT.label;
    final PatientRepository patientRepository;
    final PatientMapper patientMapper;
    final EventProducer eventProducer;

    public PatientServiceImpl(PatientRepository patientRepository, PatientMapper patientMapper, EventProducer eventProducer) {
        this.patientRepository = patientRepository;
        this.patientMapper = patientMapper;
        this.eventProducer = eventProducer;
    }

    @Override
    public Patient createPatient(PatientInput patientInput) {
        Patient patient = patientMapper.convertPatientInputToEntity(patientInput);
        Patient createdPatient = patientRepository.save(patient);
        producePatientCreatedEvent(patient);
        return createdPatient;
    }

    private void producePatientCreatedEvent(Patient patient) {
        PatientDTO patientDTO = new PatientDTO(patient);
        eventProducer.produce(new PatientCreatedEvent(PATIENT_TOPIC, PATIENT_CREATED_EVENT, patientDTO));
    }
}
