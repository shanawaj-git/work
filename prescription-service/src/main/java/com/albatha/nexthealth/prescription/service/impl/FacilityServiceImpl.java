package com.albatha.nexthealth.prescription.service.impl;

import com.albatha.nexthealth.prescription.domain.Facility;
import com.albatha.nexthealth.prescription.domain.Prescription;
import com.albatha.nexthealth.prescription.repositories.DrugRepository;
import com.albatha.nexthealth.prescription.repositories.FacilityRepository;
import com.albatha.nexthealth.prescription.service.FacilityService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class FacilityServiceImpl implements FacilityService {

    final FacilityRepository facilityRepository;
    final DrugRepository drugRepository;

    public FacilityServiceImpl(FacilityRepository facilityRepository, DrugRepository drugRepository) {
        this.facilityRepository = facilityRepository;
        this.drugRepository = drugRepository;
    }

    public void addOrUpdateFacility(Prescription prescription) {
        Facility existingFacilityEntity = facilityRepository.findFacilitiesByFacId(prescription.getSendingFacility().getFacId());
        if (existingFacilityEntity != null) {
            Long facilityId = existingFacilityEntity.getFacilityId();
            BeanUtils.copyProperties(prescription.getSendingFacility(), existingFacilityEntity, "createdDate");
            existingFacilityEntity.setFacilityId(facilityId);
            prescription.setSendingFacility(existingFacilityEntity);
        }

    }
}

