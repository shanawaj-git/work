package com.albatha.paymentservice.service;

import com.albatha.paymentservice.dto.CustomerDTO;
import com.albatha.paymentservice.model.Customer;
import reactor.core.publisher.Mono;

public interface CustomerMethodService {

    Mono<Customer> addCustomer(CustomerDTO customerDTO);
}
