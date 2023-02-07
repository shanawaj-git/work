package com.albatha.paymentservice.service.provider;

import com.albatha.paymentservice.dto.input.PaymentMethodInputDTO;
import com.albatha.paymentservice.model.Customer;
import com.albatha.paymentservice.service.provider.exception.PaymentProviderServiceException;
import reactor.core.publisher.Mono;


public interface PaymentMethodProviderService {
    Mono<PaymentMethodProviderData> addPaymentMethod(Customer customer, PaymentMethodInputDTO paymentMethodInputDTO) throws PaymentProviderServiceException;

    Mono<PaymentMethodProviderData> updatePaymentMethod(Customer customer, PaymentMethodInputDTO paymentMethodInputDTO, String  paymentMethodProviderId) throws PaymentProviderServiceException;
    Mono<PaymentMethodProviderData> deletePaymentMethod(Customer customer, String paymentMethodProviderId) throws PaymentProviderServiceException;
}
