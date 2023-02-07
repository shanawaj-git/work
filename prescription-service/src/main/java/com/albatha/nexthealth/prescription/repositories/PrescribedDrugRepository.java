package com.albatha.nexthealth.prescription.repositories;

import com.albatha.nexthealth.prescription.domain.PrescribedDrug;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrescribedDrugRepository extends JpaRepository<PrescribedDrug,Long> {
}
