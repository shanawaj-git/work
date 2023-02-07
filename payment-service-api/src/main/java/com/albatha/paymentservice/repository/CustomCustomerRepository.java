package com.albatha.paymentservice.repository;

import reactor.core.publisher.Mono;

public interface CustomCustomerRepository<Customer, UUID> {
    Mono<Customer> getCustomerById(UUID customerId);
}
