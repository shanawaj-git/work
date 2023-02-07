package com.albatha.paymentservice.controller;


import com.albatha.paymentservice.builder.PaymentMethodInputDTOBuilder;
import com.albatha.paymentservice.builder.PaymentMethodOutputDTOBuilder;
import com.albatha.paymentservice.dto.input.PaymentMethodInputDTO;
import com.albatha.paymentservice.dto.output.PaymentMethodOutputDTO;
import com.albatha.paymentservice.service.PaymentMethodService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;


@ExtendWith(SpringExtension.class)
@WebFluxTest(controllers = PaymentMethodController.class)
class PaymentServiceControllerTest {
    static String ADD_PAYMENT_METHOD_URL = "api/v1/customers";
    PaymentMethodInputDTO paymentMethodInputDTO;
    PaymentMethodOutputDTO paymentMethodOutputDTO;
    @MockBean
    PaymentMethodService paymentMethodService;
    @Autowired
    private WebTestClient webTestClient;

    @BeforeEach
    void setup() {
        paymentMethodInputDTO = new PaymentMethodInputDTOBuilder().build();
        paymentMethodOutputDTO = new PaymentMethodOutputDTOBuilder().build();
    }

    @Test
    void addPaymentMethodControllerUnitTest() {
        when(paymentMethodService.addPaymentMethod(any(), any()))
                .thenReturn(Mono.just(paymentMethodOutputDTO));

        webTestClient
                .post()
                .uri(ADD_PAYMENT_METHOD_URL + "/{customerId}/paymentmethods", "44444")
                .bodyValue(paymentMethodInputDTO)
                .exchange()
                .expectBody(PaymentMethodOutputDTO.class)
                .consumeWith(paymentMethodOutputDTOEntityExchangeResult -> {
                    var savedPaymentMethod = paymentMethodOutputDTOEntityExchangeResult.getResponseBody();
                    assert savedPaymentMethod != null;
                });
    }

}
