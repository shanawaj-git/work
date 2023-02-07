package com.albatha.paymentservice.service.provider;

import com.albatha.paymentservice.dto.CustomerDTO;
import com.albatha.paymentservice.service.provider.exception.PaymentProviderServiceException;
import reactor.core.publisher.Mono;

public interface CustomerMethodProviderService {
    Mono<CustomerMethodProviderData> saveCustomerOnProvider(CustomerDTO customerDTO) throws PaymentProviderServiceException;
}
