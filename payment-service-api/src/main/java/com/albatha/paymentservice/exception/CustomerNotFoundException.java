package com.albatha.paymentservice.exception;

import com.albatha.paymentservice.constants.ErrorMessage;

public class CustomerNotFoundException extends RuntimeException {
    public CustomerNotFoundException(ErrorMessage errorMessage) {
        super(errorMessage.message);
    }
}
