package com.albatha.nexthealth.patientsservice.repositories;

import com.albatha.nexthealth.patientsservice.model.InsuranceProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface InsuranceProviderRepository extends JpaRepository<InsuranceProvider, UUID> {
}