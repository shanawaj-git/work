package com.albatha.nexthealth.patientsservice.repositories;

import com.albatha.nexthealth.patientsservice.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PatientAddressRepository extends JpaRepository<Address, UUID> {
}
