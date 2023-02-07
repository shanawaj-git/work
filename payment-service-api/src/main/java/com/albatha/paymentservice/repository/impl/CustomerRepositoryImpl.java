package com.albatha.paymentservice.repository.impl;

import com.albatha.paymentservice.model.Customer;
import com.albatha.paymentservice.repository.CustomCustomerRepository;
import com.albatha.paymentservice.util.DBCollections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import reactor.core.publisher.Mono;

import java.util.UUID;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.unwind;
public class CustomerRepositoryImpl implements CustomCustomerRepository<Customer,UUID> {
    @Autowired
    ReactiveMongoTemplate reactiveMongoTemplate;
     private static final String APPLICATION ="application";

    @Override
    public Mono<Customer> getCustomerById(UUID customerId) {
        Aggregation aggregation = Aggregation.newAggregation(
                customerMatchOperation(customerId),
                applicationLookupOperation(),
                unwind(APPLICATION));
        return reactiveMongoTemplate.aggregate(aggregation, DBCollections.CUSTOMER.collectionName, Customer.class).singleOrEmpty();
    }

    private MatchOperation customerMatchOperation(UUID customerId) {
        return new MatchOperation(Criteria.where("_id").is(customerId));
    }

    private LookupOperation applicationLookupOperation() {
        return LookupOperation.newLookup()
                .from(APPLICATION)
                .localField("applicationId")
                .foreignField("_id")
                .as(APPLICATION);
    }
}
