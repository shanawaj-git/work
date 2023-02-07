package com.albatha.nexthealth.prescription.service.impl;

import com.albatha.nexthealth.prescription.builders.PrescriptionBuilder;
import com.albatha.nexthealth.prescription.builders.PatientBuilder;
import com.albatha.nexthealth.prescription.builders.DoctorBuilder;
import com.albatha.nexthealth.prescription.builders.InsuranceBuilder;
import com.albatha.nexthealth.prescription.builders.FacilityBuilder;
import com.albatha.nexthealth.prescription.domain.Patient;
import com.albatha.nexthealth.prescription.domain.Prescription;
import com.albatha.nexthealth.prescription.domain.Facility;
import com.albatha.nexthealth.prescription.domain.Insurance;
import com.albatha.nexthealth.prescription.domain.Doctor;
import com.albatha.nexthealth.prescription.repositories.PatientRepository;
import com.albatha.nexthealth.prescription.repositories.PrescriptionRepository;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.test.annotation.DirtiesContext;

import static com.albatha.nexthealth.prescription.utils.CustomAssertions.shouldBeSame;

@EmbeddedKafka
@DirtiesContext
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PrescriptionServiceImplTest {

    @MockBean
    PrescriptionRepository prescriptionRepository;

    @MockBean
    PatientRepository patientRepository;

    @MockBean
    DoctorServiceImpl doctorService;

    @MockBean
    InsuranceServiceImpl insuranceService;

    @MockBean
    PatientServiceImpl patientService;

    @MockBean
    AddressServiceImpl addressService;

    @MockBean
    FacilityServiceImpl facilityService;

    @MockBean
    InsuranceProviderServiceImpl insuranceProviderService;

    @MockBean
    PrescribedDrugServiceImpl prescribedDrugService;

    @Autowired
    PrescriptionServiceImpl prescriptionService;

    @Captor
    ArgumentCaptor<Prescription> prescriptionCaptor;

    @Test
    void shouldSavePrescriptionWhenPatientAlreadyExist() throws Exception {
        Patient patient = new PatientBuilder().build();
        Doctor doctor = new DoctorBuilder().build();
        Insurance insurance = new InsuranceBuilder().build();
        Facility sendingFacility = new FacilityBuilder().build();

        Prescription prescription = new PrescriptionBuilder()
            .patient(patient)
            .doctor(doctor)
            .insurance(insurance)
            .sendingFacility(sendingFacility)
            .build();

        Mockito.when(patientRepository.findPatientByEmiratesId(patient.getEmiratesId())).thenReturn(patient);
        Mockito.when(prescriptionRepository.save(prescriptionCaptor.capture())).thenReturn(prescription);

        prescriptionService.persistPrescription(prescription);

        Prescription capturedPrescription = prescriptionCaptor.getValue();
        shouldBeSame(capturedPrescription, prescription);
        shouldBeSame(capturedPrescription.getPatient(), patient);
    }
}