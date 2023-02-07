package com.albatha.nexthealth.prescription.repositories;

import com.albatha.nexthealth.prescription.domain.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    public Doctor getDoctorByDocId(String docId);
}
