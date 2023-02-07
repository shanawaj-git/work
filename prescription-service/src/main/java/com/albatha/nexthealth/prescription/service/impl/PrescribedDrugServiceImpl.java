package com.albatha.nexthealth.prescription.service.impl;

import com.albatha.nexthealth.prescription.domain.Drug;
import com.albatha.nexthealth.prescription.domain.Prescription;
import com.albatha.nexthealth.prescription.repositories.DrugRepository;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class PrescribedDrugServiceImpl {
    final DrugRepository drugRepository;

    public PrescribedDrugServiceImpl(DrugRepository drugRepository) {
        this.drugRepository = drugRepository;
    }

    public void addOrUpdatePrescriptionDrug(Prescription prescription) {
        prescription.getPrescribedDrugs().stream().map(prescribedDrug -> {
            Drug existingDrugEntity = drugRepository.getDrugByCode(prescribedDrug.getDrug().getCode());
            if (existingDrugEntity != null) prescribedDrug.setDrug(existingDrugEntity);
            prescribedDrug.setPrescription(prescription);
            return null;
        }).collect(Collectors.toSet());
    }
}
