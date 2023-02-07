package com.albatha.paymentservice.controller;

import com.albatha.paymentservice.builder.CustomerDTOBuilder;
import com.albatha.paymentservice.dto.CustomerDTO;
import com.albatha.paymentservice.service.CustomerMethodService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.reactive.server.WebTestClient;

@ExtendWith(SpringExtension.class)
@WebFluxTest(controllers = CustomerMethodController.class)
class CustomerServiceControllerTest {

    static String CUSTOMER_REST_URL = "/api/v1/customer";

    CustomerDTO customerDTO;

    @MockBean
    CustomerMethodService customerMethodService;

    @Autowired
    private WebTestClient webTestClient;

    @BeforeEach
    public void setup(){
        customerDTO = new CustomerDTOBuilder().build();
    }

    @Test
     void addCustomer(){
        webTestClient
                .post()
                .uri(CUSTOMER_REST_URL+ "/new")
                .bodyValue(customerDTO)
                .exchange()
                .expectBody(CustomerDTO.class)
                .consumeWith(customerDTOEntityExchangeResult -> {
                   var customerPaymentMethod = customerDTOEntityExchangeResult.getResponseBody();
                   assert customerPaymentMethod != null;
                });
    }
}
