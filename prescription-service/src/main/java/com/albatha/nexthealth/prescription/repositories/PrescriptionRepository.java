package com.albatha.nexthealth.prescription.repositories;

import com.albatha.nexthealth.prescription.domain.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription,Long> {
	Prescription findByPrescriptionNumber(String prescriptionNumber);
}
