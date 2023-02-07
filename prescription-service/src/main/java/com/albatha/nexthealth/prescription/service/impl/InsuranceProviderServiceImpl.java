package com.albatha.nexthealth.prescription.service.impl;

import com.albatha.nexthealth.prescription.domain.InsuranceProvider;
import com.albatha.nexthealth.prescription.domain.Prescription;
import com.albatha.nexthealth.prescription.repositories.InsuranceProviderRepository;
import com.albatha.nexthealth.prescription.service.InsuranceProviderService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class InsuranceProviderServiceImpl implements InsuranceProviderService {

    final InsuranceProviderRepository insuranceProviderRepository;

    public InsuranceProviderServiceImpl(InsuranceProviderRepository insuranceProviderRepository) {
        this.insuranceProviderRepository = insuranceProviderRepository;
    }

    public void addOrUpdateInsuranceProvider(Prescription prescription) {
        prescription.getPatient().getInsuranceSet().stream().map(insurance -> {
            InsuranceProvider existingInsuranceProviderEntity = insuranceProviderRepository.getInsuranceProviderByCode(insurance.getProvider().getCode());
            if (existingInsuranceProviderEntity != null) {
                Long id = existingInsuranceProviderEntity.getInsuranceproviderId();
                BeanUtils.copyProperties(insurance.getProvider(), existingInsuranceProviderEntity, "createdDate");
                existingInsuranceProviderEntity.setInsuranceproviderId(id);
                insurance.setProvider(existingInsuranceProviderEntity);
            }
            return null;
        }).collect(Collectors.toSet());
    }


}
