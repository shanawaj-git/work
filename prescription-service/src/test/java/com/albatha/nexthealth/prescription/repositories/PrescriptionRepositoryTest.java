package com.albatha.nexthealth.prescription.repositories;

import com.albatha.nexthealth.prescription.builders.PrescriptionBuilder;
import com.albatha.nexthealth.prescription.builders.PrescribedDrugBuilder;
import com.albatha.nexthealth.prescription.builders.InsuranceBuilder;
import com.albatha.nexthealth.prescription.builders.DoctorBuilder;
import com.albatha.nexthealth.prescription.builders.PatientBuilder;
import com.albatha.nexthealth.prescription.builders.FacilityBuilder;
import com.albatha.nexthealth.prescription.domain.Patient;
import com.albatha.nexthealth.prescription.domain.Doctor;
import com.albatha.nexthealth.prescription.domain.Insurance;
import com.albatha.nexthealth.prescription.domain.Facility;
import com.albatha.nexthealth.prescription.domain.Prescription;
import com.albatha.nexthealth.prescription.domain.PrescribedDrug;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.test.annotation.DirtiesContext;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static com.albatha.nexthealth.prescription.utils.CustomAssertions.shouldBeSame;


@EmbeddedKafka
@DirtiesContext
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PrescriptionRepositoryTest {

    @BeforeEach
    void clean() {
        prescriptionRepository.deleteAll();
        patientRepository.deleteAll();
        insuranceRepository.deleteAll();
        doctorRepository.deleteAll();
        facilityRepository.deleteAll();
        prescribedDrugRepository.deleteAll();
    }

    @Autowired PrescriptionRepository prescriptionRepository;
    @Autowired PatientRepository patientRepository;
    @Autowired InsuranceRepository insuranceRepository;
    @Autowired DoctorRepository doctorRepository;
    @Autowired PrescribedDrugRepository prescribedDrugRepository;
    @Autowired FacilityRepository facilityRepository;

    Patient patient = new PatientBuilder().build();
    Doctor doctor = new DoctorBuilder().build();
    Insurance insurance = new InsuranceBuilder().build();
    Facility facility = new FacilityBuilder().build();
    Set<PrescribedDrug> prescribedDrugs = Set.of(
            new PrescribedDrugBuilder().build()
    );

    @Test
    void shouldSavePrescriptionWhen() {
        patient = patientRepository.save(patient);
        doctor = doctorRepository.save(doctor);
        insurance = insuranceRepository.save(insurance);
        facility = facilityRepository.save(facility);
        List<PrescribedDrug> savedPrescribedDrugs = prescribedDrugRepository.saveAll(prescribedDrugs);

        Prescription prescription = new PrescriptionBuilder()
            .doctor(doctor)
            .insurance(insurance)
            .prescribedDrugs(new HashSet<>(savedPrescribedDrugs))
            .insurance(insurance)
            .sendingFacility(facility)
            .patient(patient)
            .build();
        prescriptionRepository.save(prescription);

        List<Prescription> response = prescriptionRepository.findAll();
        Assertions.assertEquals(1, response.size());
        shouldBeSame(prescription, response.get(0));
    }

    // Test find prescription by prescriptionNumber
    @Test
    void shouldReturnPrescriptionForGivenPrescriptionNumber() {
        patient = patientRepository.save(patient);
        doctor = doctorRepository.save(doctor);
        insurance = insuranceRepository.save(insurance);
        facility = facilityRepository.save(facility);
        List<PrescribedDrug> savedPrescribedDrugs = prescribedDrugRepository.saveAll(prescribedDrugs);
        String expectedPrescriptionNumber = "PRE-3548209";
        String prescriptionNumber = "PRE-124321";

        Prescription prescription = new PrescriptionBuilder()
                .doctor(doctor)
                .insurance(insurance)
                .prescribedDrugs(new HashSet<>(savedPrescribedDrugs))
                .insurance(insurance)
                .sendingFacility(facility)
                .patient(patient)
                .prescriptionNumber(prescriptionNumber)
                .build();

        Prescription expectedPrescription = new PrescriptionBuilder()
                .doctor(doctor)
                .insurance(insurance)
                .prescribedDrugs(new HashSet<>(savedPrescribedDrugs))
                .insurance(insurance)
                .sendingFacility(facility)
                .patient(patient)
                .prescriptionNumber(expectedPrescriptionNumber)
                .build();

        prescriptionRepository.saveAll(List.of(expectedPrescription, prescription));

        Prescription response = prescriptionRepository.findByPrescriptionNumber(expectedPrescription.getPrescriptionNumber());
        shouldBeSame(expectedPrescription, response);
    }

    @Test
    void shouldReturnNullWhenPrescriptionDoesNotExistForGivenPrescriptionNumber() {
        patient = patientRepository.save(patient);
        doctor = doctorRepository.save(doctor);
        insurance = insuranceRepository.save(insurance);
        facility = facilityRepository.save(facility);
        List<PrescribedDrug> savedPrescribedDrugs = prescribedDrugRepository.saveAll(prescribedDrugs);
        String prescriptionNumber = "PRE-124321";
        String randomPrescriptionNumber = "PRE-239542";

        Prescription prescription = new PrescriptionBuilder()
                .doctor(doctor)
                .insurance(insurance)
                .prescribedDrugs(new HashSet<>(savedPrescribedDrugs))
                .insurance(insurance)
                .sendingFacility(facility)
                .patient(patient)
                .prescriptionNumber(prescriptionNumber)
                .build();

        prescriptionRepository.save(prescription);

        Prescription response = prescriptionRepository.findByPrescriptionNumber(randomPrescriptionNumber);
        Assertions.assertNull(response);
    }
}
