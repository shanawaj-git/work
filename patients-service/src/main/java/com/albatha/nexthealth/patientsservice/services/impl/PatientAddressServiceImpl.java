package com.albatha.nexthealth.patientsservice.services.impl;

import com.albatha.nexthealth.patientsservice.constants.EventType;
import com.albatha.nexthealth.patientsservice.constants.Topic;
import com.albatha.nexthealth.patientsservice.dto.AddressDTO;
import com.albatha.nexthealth.patientsservice.dto.Event;
import com.albatha.nexthealth.patientsservice.graphql.input.CreatePatientAddressInput;
import com.albatha.nexthealth.patientsservice.kafka.producer.EventProducer;
import com.albatha.nexthealth.patientsservice.model.Address;
import com.albatha.nexthealth.patientsservice.model.Patient;
import com.albatha.nexthealth.patientsservice.repositories.PatientAddressRepository;
import com.albatha.nexthealth.patientsservice.repositories.PatientRepository;
import com.albatha.nexthealth.patientsservice.services.PatientAddressService;
import com.albatha.nexthealth.patientsservice.services.exception.PatientNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.UUID;

@Service
@Slf4j
public class PatientAddressServiceImpl implements PatientAddressService {
    final PatientRepository patientRepository;
    final PatientAddressRepository patientAddressRepository;
    final EventProducer eventProducer;
    final ModelMapper customModelMapper;


    public PatientAddressServiceImpl(PatientRepository patientRepository, PatientAddressRepository patientAddressRepository, EventProducer eventProducer, ModelMapper customModelMapper) {
        this.patientRepository = patientRepository;
        this.patientAddressRepository = patientAddressRepository;
        this.eventProducer = eventProducer;
        this.customModelMapper = customModelMapper;
    }

    @Transactional
    @Override
    public Address addPatientAddress(String emiratesId, AddressDTO addressDTO) throws PatientNotFoundException {
        log.info("create patient address {}", addressDTO);
        Patient patient = patientRepository.findByEmiratesId(emiratesId);
        validatePatient(patient);
        Address address = savePatientAddress(patient, addressDTO);
        produceNewPatientAddressEvent(address);
        return address;
    }

    private Address savePatientAddress(Patient patient, AddressDTO addressDTO) {
        Address patientAddress = mapToAddressEntity(addressDTO);
        patientAddress.setPatient(patient);
        return patientAddressRepository.save(patientAddress);
    }

    private void validatePatient(Patient patient) throws PatientNotFoundException {
        if (patient == null) {
            throw new PatientNotFoundException();
        }
    }

    private void produceNewPatientAddressEvent(Address address) {
        AddressDTO mappedAddress = customModelMapper.map(address, AddressDTO.class);
        Event<?> newPatientAddress = new Event<>(Topic.PATIENTS.label, EventType.NEW_ADDRESS.label, mappedAddress);
        eventProducer.produce(newPatientAddress);
    }

    public Address mapToAddressEntity(AddressDTO createPatientAddressInput) {
        return new ModelMapper().map(createPatientAddressInput, Address.class);
    }

}
