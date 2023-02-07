package com.albatha.paymentservice.exception;

import com.albatha.paymentservice.constants.ErrorMessage;

public class PaymentNotFoundException extends RuntimeException{
    public PaymentNotFoundException(ErrorMessage errorMessage){
        super(errorMessage.message);
    }
}
