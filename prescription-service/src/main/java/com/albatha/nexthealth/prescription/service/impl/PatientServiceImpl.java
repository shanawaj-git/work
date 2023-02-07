package com.albatha.nexthealth.prescription.service.impl;

import com.albatha.nexthealth.prescription.client.PatientInputDTO;
import com.albatha.nexthealth.prescription.client.PatientServiceClient;
import com.albatha.nexthealth.prescription.domain.Patient;
import com.albatha.nexthealth.prescription.domain.Prescription;
import com.albatha.nexthealth.prescription.exception.PatientCreationException;
import com.albatha.nexthealth.prescription.repositories.PatientRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class PatientServiceImpl {

    final PatientRepository patientRepository;

    final
    PatientServiceClient patientServiceClient;

    public PatientServiceImpl(PatientRepository patientRepository, PatientServiceClient patientServiceClient) {
        this.patientRepository = patientRepository;
        this.patientServiceClient = patientServiceClient;
    }

    public void addOrUpdatePatient(Prescription prescription) throws PatientCreationException, IOException {
        Patient patient = prescription.getPatient();
        Patient existingPatient = patientRepository.findPatientByEmiratesId(prescription.getPatient().getEmiratesId());
        if (existingPatient == null) {
            createPatient(patient);
            return;
        }

        setExistingPatient(prescription, existingPatient);
    }

    private void setExistingPatient(Prescription prescription, Patient patient) {
        Long patientId = patient.getPatientId();
        setPatientFields(prescription, patient);
        patient.setPatientId(patientId);
        setPatientInsurances(prescription, patient);
        setPatientAddresses(prescription, patient);
        prescription.setPatient(patient);
    }

    private void setPatientFields(Prescription prescription, Patient patient) {
        BeanUtils.copyProperties(prescription.getPatient(), patient, "addressSet", "insuranceSet",
                "createdDate");
    }

    private void setPatientInsurances(Prescription prescription, Patient patient) {
        patient.getInsuranceSet().addAll(prescription.getPatient().getInsuranceSet());
    }

    private void setPatientAddresses(Prescription prescription, Patient patient) {
        patient.getAddressSet().addAll(prescription.getPatient().getAddressSet());
    }

    private void createPatient(Patient patient) throws PatientCreationException, IOException {
        PatientInputDTO input = new PatientInputDTO(patient);
        patientServiceClient.createPatient(input);
    }
}
