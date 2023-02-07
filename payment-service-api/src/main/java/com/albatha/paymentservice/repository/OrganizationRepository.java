package com.albatha.paymentservice.repository;

import com.albatha.paymentservice.model.Organization;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Repository
public interface OrganizationRepository extends ReactiveMongoRepository<Organization, UUID> {
    Mono<Organization> findByName(String name);

}
