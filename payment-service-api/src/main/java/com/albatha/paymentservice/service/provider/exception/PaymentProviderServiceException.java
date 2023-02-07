package com.albatha.paymentservice.service.provider.exception;

import com.albatha.paymentservice.constants.ErrorMessage;

public class PaymentProviderServiceException extends RuntimeException {
    public PaymentProviderServiceException(ErrorMessage errorMessage, Throwable ex) {
        super(errorMessage.message, ex);
    }

    public PaymentProviderServiceException(ErrorMessage errorMessage) {
        super(errorMessage.message);
    }
}
