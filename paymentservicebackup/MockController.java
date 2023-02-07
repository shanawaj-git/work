package com.albatha.paymentservice.controller;

import com.albatha.paymentservice.model.Customer;
import com.albatha.paymentservice.repository.ApplicationRepository;
import com.albatha.paymentservice.repository.CustomerRepository;
import com.albatha.paymentservice.repository.OrganizationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.UUID;

@RestController()
@RequestMapping("mock")
@Slf4j
public class MockController {
    private final CustomerRepository customerRepository;
    private final ApplicationRepository applicationRepository;
    private final OrganizationRepository organizationRepository;

    public MockController(CustomerRepository customerRepository, ApplicationRepository applicationRepository, OrganizationRepository organizationRepository) {

        this.customerRepository = customerRepository;
        this.applicationRepository = applicationRepository;
        this.organizationRepository = organizationRepository;

    }
    @PostMapping("/initcustomer")
    public Mono<Customer> intiDummyData(@RequestBody Customer customer) {
        customer.getApplication().getOrganization().setId(UUID.randomUUID());

        return organizationRepository.save(customer.getApplication().getOrganization()).flatMap(organization -> {
            customer.getApplication().setId(UUID.randomUUID());
            customer.getApplication().setOrganization(organization);
            return applicationRepository.save(customer.getApplication());
        }).flatMap(application -> {
            customer.setId(UUID.randomUUID());
            customer.setApplication(null);
            customer.setApplicationId(application.getId());
            log.info("created customer id {}" , customer.getId());
            return customerRepository.save(customer);
        });
    }
}
