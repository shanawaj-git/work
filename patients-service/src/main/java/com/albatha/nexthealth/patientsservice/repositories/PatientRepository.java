package com.albatha.nexthealth.patientsservice.repositories;

import com.albatha.nexthealth.patientsservice.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PatientRepository extends JpaRepository<Patient, UUID> {

    Patient findByEmiratesId(String emiratesId);
}
