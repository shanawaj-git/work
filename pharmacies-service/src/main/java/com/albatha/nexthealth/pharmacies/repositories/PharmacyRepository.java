package com.albatha.nexthealth.pharmacies.repositories;

import com.albatha.nexthealth.pharmacies.model.Pharmacy;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PharmacyRepository extends ReactiveMongoRepository<Pharmacy, UUID>, CustomPharmacyRepository {
}
