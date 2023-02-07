package com.albatha.paymentservice.service;

import com.albatha.paymentservice.dto.input.PaymentMethodInputDTO;
import com.albatha.paymentservice.dto.output.PaymentMethodDeleteOutputDTO;
import com.albatha.paymentservice.dto.output.PaymentMethodOutputDTO;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

public interface PaymentMethodService {
    Mono<PaymentMethodOutputDTO> addPaymentMethod(UUID customerId, PaymentMethodInputDTO paymentMethodInputDTO);

    Mono<PaymentMethodOutputDTO> getPaymentMethodAttachedToCustomer(UUID customerId, UUID paymentMethodId);

    Flux<PaymentMethodOutputDTO> getAllPaymentMethodsAttachedToCustomer (UUID customerId);

    Mono<PaymentMethodDeleteOutputDTO> deletePaymentMethod(UUID customerId, UUID paymentMethodId);

    Mono<PaymentMethodOutputDTO> updatePaymentMethod(UUID customerId, UUID paymentMethodId,PaymentMethodInputDTO paymentMethodInputDTO);
}
