package com.albatha.paymentservice.repository;

import com.albatha.paymentservice.model.Customer;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CustomerRepository extends ReactiveMongoRepository<Customer, UUID>, CustomCustomerRepository<Customer, UUID> {
}
