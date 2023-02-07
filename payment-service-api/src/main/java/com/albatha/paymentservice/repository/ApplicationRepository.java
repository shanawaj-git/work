package com.albatha.paymentservice.repository;

import com.albatha.paymentservice.model.Application;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Repository
public interface ApplicationRepository extends ReactiveMongoRepository<Application, UUID> {
    Mono<Application> findByName(String applicationName);
}
