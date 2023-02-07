package com.albatha.nexthealth.prescription.repositories;

import com.albatha.nexthealth.prescription.domain.Drug;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DrugRepository extends JpaRepository<Drug, Long> {

    public Drug getDrugByCode(String drugCode);
}
