package com.albatha.nexthealth.pharmacies.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.albatha.nexthealth.pharmacies.model.Drug;

import reactor.core.publisher.Flux;

public interface DrugRepository extends ReactiveMongoRepository<Drug, UUID> {
	Flux<Drug> findAllByCodesValueIn(List<String> codeValues);
}
