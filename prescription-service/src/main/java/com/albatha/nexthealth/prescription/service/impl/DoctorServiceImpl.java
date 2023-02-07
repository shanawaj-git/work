package com.albatha.nexthealth.prescription.service.impl;

import com.albatha.nexthealth.prescription.domain.Doctor;
import com.albatha.nexthealth.prescription.domain.Prescription;
import com.albatha.nexthealth.prescription.repositories.DoctorRepository;
import com.albatha.nexthealth.prescription.service.DoctorService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class DoctorServiceImpl implements DoctorService {

    final DoctorRepository doctorRepository;

    public DoctorServiceImpl(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public void addOrUpdateDoctor(Prescription prescription) {
        Doctor existingDoctorEntity = doctorRepository.getDoctorByDocId(prescription.getDoctor().getDocId());
        if (existingDoctorEntity != null) {
            Long doctorId = existingDoctorEntity.getDoctorId();
            BeanUtils.copyProperties(prescription.getDoctor(), existingDoctorEntity, "createdDate");
            existingDoctorEntity.setDoctorId(doctorId);
            prescription.setDoctor(existingDoctorEntity);
        }
    }
}
