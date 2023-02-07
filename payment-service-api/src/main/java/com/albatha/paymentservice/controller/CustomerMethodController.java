package com.albatha.paymentservice.controller;

import com.albatha.paymentservice.dto.CustomerDTO;
import com.albatha.paymentservice.model.Customer;
import com.albatha.paymentservice.service.CustomerMethodService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import javax.validation.Valid;

@RestController()
@RequestMapping("api/v1/customers")
@Slf4j
public class CustomerMethodController {

    private final CustomerMethodService customerMethodService;

    public CustomerMethodController(CustomerMethodService customerMethodService) {
        this.customerMethodService = customerMethodService;
    }

    @PostMapping("/create")
    public Mono<ResponseEntity<Customer>> createCustomer(@RequestBody @Valid CustomerDTO customerDTO){
        return customerMethodService.addCustomer(customerDTO).
                map(ResponseEntity.status(HttpStatus.CREATED)::body)
                .switchIfEmpty(Mono.just(ResponseEntity.badRequest().build()));

    }
}
