package com.albatha.nexthealth.patientsservice.repositories;


import com.albatha.nexthealth.patientsservice.model.Insurance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface InsuranceRepository extends JpaRepository<Insurance, UUID> {

    Insurance findInsuranceByInsId(String insId);
}
