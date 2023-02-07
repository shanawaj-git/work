package com.albatha.nexthealth.prescription.repositories;

import com.albatha.nexthealth.prescription.domain.Facility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacilityRepository extends JpaRepository<Facility,Long> {

    public Facility findFacilitiesByFacId(String facId);
}
