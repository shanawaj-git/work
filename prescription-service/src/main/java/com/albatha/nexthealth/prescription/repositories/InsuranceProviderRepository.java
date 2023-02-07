package com.albatha.nexthealth.prescription.repositories;

import com.albatha.nexthealth.prescription.domain.InsuranceProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsuranceProviderRepository extends JpaRepository<InsuranceProvider, Long> {

    public InsuranceProvider getInsuranceProviderByCode(String providerId);
}
