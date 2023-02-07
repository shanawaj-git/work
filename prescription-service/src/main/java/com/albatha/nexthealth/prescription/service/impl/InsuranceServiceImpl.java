package com.albatha.nexthealth.prescription.service.impl;

import com.albatha.nexthealth.prescription.domain.Insurance;
import com.albatha.nexthealth.prescription.domain.Prescription;
import com.albatha.nexthealth.prescription.repositories.InsuranceRepository;
import com.albatha.nexthealth.prescription.service.InsuranceService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class InsuranceServiceImpl implements InsuranceService {

    final InsuranceRepository insuranceRepository;

    public InsuranceServiceImpl(InsuranceRepository insuranceRepository) {
        this.insuranceRepository = insuranceRepository;
    }

    public void addOrUpdateInsurance(Prescription prescription) {
        Set<Insurance> insuranceSet = prescription.getPatient().getInsuranceSet().stream().map(ins -> {
            Insurance insurance = ins;
            Insurance existingInsuranceEntity = insuranceRepository.findInsuranceByInsId(insurance.getInsId());
            if (existingInsuranceEntity != null) {
                Long insuranceId = existingInsuranceEntity.getInsuranceId();
                BeanUtils.copyProperties(ins, existingInsuranceEntity, "provider", "createdDate");
                existingInsuranceEntity.setInsuranceId(insuranceId);
                existingInsuranceEntity.setProvider(ins.getProvider());
                return existingInsuranceEntity;
            } else return ins;

        }).collect(Collectors.toSet());
        prescription.getPatient().setInsuranceSet(insuranceSet);
    }
}
