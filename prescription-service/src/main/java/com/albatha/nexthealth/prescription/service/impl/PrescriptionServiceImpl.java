package com.albatha.nexthealth.prescription.service.impl;

import com.albatha.nexthealth.prescription.domain.Insurance;
import com.albatha.nexthealth.prescription.domain.Prescription;
import com.albatha.nexthealth.prescription.exception.PatientCreationException;
import com.albatha.nexthealth.prescription.repositories.PrescriptionRepository;
import com.albatha.nexthealth.prescription.service.PrescriptionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    final PrescriptionRepository prescriptionRepository;
    final DoctorServiceImpl doctorService;
    final InsuranceServiceImpl insuranceService;
    final PatientServiceImpl patientService;
    final AddressServiceImpl addressService;
    final FacilityServiceImpl facilityService;
    final InsuranceProviderServiceImpl insuranceProviderService;
    final PrescribedDrugServiceImpl prescribedDrugService;

    public PrescriptionServiceImpl(PrescriptionRepository prescriptionRepository, DoctorServiceImpl doctorService, InsuranceServiceImpl insuranceService, PatientServiceImpl patientService, AddressServiceImpl addressService, FacilityServiceImpl facilityService, InsuranceProviderServiceImpl insuranceProviderService, PrescribedDrugServiceImpl prescribedDrugService) {
        this.prescriptionRepository = prescriptionRepository;
        this.doctorService = doctorService;
        this.insuranceService = insuranceService;
        this.patientService = patientService;
        this.addressService = addressService;
        this.facilityService = facilityService;
        this.insuranceProviderService = insuranceProviderService;
        this.prescribedDrugService = prescribedDrugService;
    }

    @Transactional
    public void persistPrescription(Prescription prescription) throws PatientCreationException, IOException {
        insuranceProviderService.addOrUpdateInsuranceProvider(prescription);
        insuranceService.addOrUpdateInsurance(prescription);
        addressService.addOrUpdateAddress(prescription);
        patientService.addOrUpdatePatient(prescription);
        doctorService.addOrUpdateDoctor(prescription);
        facilityService.addOrUpdateFacility(prescription);
        prescribedDrugService.addOrUpdatePrescriptionDrug(prescription);
        addInsurance(prescription);
        Prescription prescriptionDB = prescriptionRepository.save(prescription);
        log.info("prescriptionDB-->   {}",prescriptionDB);

    }

    public void addInsurance(Prescription prescription) {
        Set<Insurance> insuranceSet = prescription.getPatient().getInsuranceSet();
        Insurance insurance = insuranceSet.stream().findFirst().orElse(null);
        if (insurance != null) {
            prescription.setInsurance(insurance);
        }
    }
}
