package com.albatha.paymentservice.controller;

import com.albatha.paymentservice.dto.input.PaymentMethodInputDTO;
import com.albatha.paymentservice.dto.output.PaymentMethodDeleteOutputDTO;
import com.albatha.paymentservice.dto.output.PaymentMethodOutputDTO;
import com.albatha.paymentservice.service.PaymentMethodService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@RestController()
@RequestMapping("api/v1/customers/{customerId}")
@Slf4j
public class PaymentMethodController {
    private final PaymentMethodService paymentMethodService;

    public PaymentMethodController(PaymentMethodService paymentMethodService) {
        this.paymentMethodService = paymentMethodService;
    }

    @PostMapping("/paymentmethods")
    public Mono<ResponseEntity<PaymentMethodOutputDTO>> addPaymentMethod(@PathVariable UUID customerId, @RequestBody PaymentMethodInputDTO paymentMethodInputDTO) {
        return paymentMethodService.addPaymentMethod(customerId, paymentMethodInputDTO)
                .map(ResponseEntity.status(HttpStatus.CREATED)::body)
                .switchIfEmpty(Mono.just(ResponseEntity.badRequest().build()));
    }

    @GetMapping("/paymentmethods/{paymentMethodId}")
    public Mono<ResponseEntity<PaymentMethodOutputDTO>> getPaymentMethod(@PathVariable UUID customerId, @PathVariable UUID paymentMethodId) {
        return paymentMethodService.getPaymentMethodAttachedToCustomer(customerId, paymentMethodId)
                .map(ResponseEntity.status(HttpStatus.OK)::body)
                .switchIfEmpty(Mono.just(ResponseEntity.badRequest().build()));
    }

    @GetMapping("/paymentmethods")
    public ResponseEntity<Flux<PaymentMethodOutputDTO>> getAllPaymentMethods(@PathVariable UUID customerId) {
        return ResponseEntity.status(HttpStatus.OK).body(paymentMethodService.getAllPaymentMethodsAttachedToCustomer(customerId));

    }
    @DeleteMapping("/paymentmethods/{paymentMethodId}")
    public Mono<ResponseEntity<PaymentMethodDeleteOutputDTO>> deletePaymentMethod(@PathVariable UUID customerId, @PathVariable UUID paymentMethodId)
    {
        return paymentMethodService.deletePaymentMethod(customerId,paymentMethodId)
                .map(ResponseEntity.status(HttpStatus.OK)::body)
                .switchIfEmpty(Mono.just(ResponseEntity.badRequest().build()));

    }
    @PutMapping("/paymentmethods/{paymentMethodId}")
    public Mono<ResponseEntity<PaymentMethodOutputDTO>>updatePaymentMethod(@PathVariable UUID customerId, @PathVariable UUID paymentMethodId, @RequestBody PaymentMethodInputDTO paymentMethodInputDTO) {
        return paymentMethodService.updatePaymentMethod(customerId, paymentMethodId,paymentMethodInputDTO)
                .map(ResponseEntity.status(HttpStatus.OK)::body)
                .switchIfEmpty(Mono.just(ResponseEntity.badRequest().build()));
    }
}
