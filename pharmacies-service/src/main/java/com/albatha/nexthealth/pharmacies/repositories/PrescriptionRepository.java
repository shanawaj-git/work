package com.albatha.nexthealth.pharmacies.repositories;

import java.util.UUID;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.albatha.nexthealth.pharmacies.model.Prescription;

public interface PrescriptionRepository extends ReactiveMongoRepository<Prescription, UUID>{

}
