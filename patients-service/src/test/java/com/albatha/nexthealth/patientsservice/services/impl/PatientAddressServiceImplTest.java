package com.albatha.nexthealth.patientsservice.services.impl;

import com.albatha.nexthealth.patientsservice.builders.PatientAddressBuilder;
import com.albatha.nexthealth.patientsservice.builders.PatientBuilder;
import com.albatha.nexthealth.patientsservice.dto.AddressDTO;
import com.albatha.nexthealth.patientsservice.dto.Event;
import com.albatha.nexthealth.patientsservice.kafka.producer.EventProducer;
import com.albatha.nexthealth.patientsservice.model.Address;
import com.albatha.nexthealth.patientsservice.model.Patient;
import com.albatha.nexthealth.patientsservice.repositories.PatientAddressRepository;
import com.albatha.nexthealth.patientsservice.repositories.PatientRepository;
import com.albatha.nexthealth.patientsservice.services.exception.PatientNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PatientAddressServiceImplTest {
    @Mock
    PatientRepository patientRepository;
    @Mock
    PatientAddressRepository patientAddressRepository;

    @Mock
    EventProducer eventProducer;
    @Mock
    ModelMapper customModelMapper;
    @InjectMocks
    PatientAddressServiceImpl patientServiceImpl;

    private final String emiratesId = "784-1960-12345-1";

    @Test
    void shouldSaveAddressWhenPatientExists() throws Exception {

        Patient patient = new PatientBuilder().build();
        Address address = new PatientAddressBuilder().build();
        when(customModelMapper.map(address, AddressDTO.class)).thenReturn(new AddressDTO(address));
        when(patientRepository.findByEmiratesId(emiratesId)).thenReturn(patient);

        ArgumentCaptor<Address> addressCaptor = ArgumentCaptor.forClass(Address.class);
        when(patientAddressRepository.save(addressCaptor.capture())).thenReturn(address);
        ArgumentCaptor<Event<AddressDTO>> eventCaptor = ArgumentCaptor.forClass(Event.class);
        patientServiceImpl.addPatientAddress(emiratesId, customModelMapper.map(address, AddressDTO.class));
        assertEquals(addressCaptor.getValue().getPatient(), patient);
        verify(eventProducer).produce(eventCaptor.capture());
        assertEquals(eventCaptor.getValue().getData().getAddressId(), address.getAddressId());
    }

    @Test
    void shouldThrowExceptionWhenPatientNotExists() throws Exception {
        when(patientRepository.findByEmiratesId(emiratesId)).thenReturn(null);
        Address address = new PatientAddressBuilder().build();
        when(customModelMapper.map(address, AddressDTO.class)).thenReturn(new AddressDTO(address));
        assertThrows(PatientNotFoundException.class, () -> patientServiceImpl.addPatientAddress(emiratesId, customModelMapper.map(address, AddressDTO.class)));
    }
}
