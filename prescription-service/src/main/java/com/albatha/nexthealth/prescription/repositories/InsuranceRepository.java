package com.albatha.nexthealth.prescription.repositories;

import com.albatha.nexthealth.prescription.domain.Insurance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsuranceRepository extends JpaRepository<Insurance, Long> {

    public Insurance findInsuranceByInsId(String insId);
}
