package com.albatha.paymentservice.exception;

import com.albatha.paymentservice.constants.ErrorMessage;

public class InvalidInputDetailsException extends RuntimeException{
    public InvalidInputDetailsException(ErrorMessage errorMessage){
        super(errorMessage.message);
    }
}
