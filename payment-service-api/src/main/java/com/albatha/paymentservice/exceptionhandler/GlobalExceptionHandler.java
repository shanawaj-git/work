package com.albatha.paymentservice.exceptionhandler;


import com.albatha.paymentservice.exception.CustomerNotFoundException;
import com.albatha.paymentservice.exception.InvalidInputDetailsException;
import com.albatha.paymentservice.exception.PaymentNotFoundException;
import com.albatha.paymentservice.service.provider.exception.PaymentProviderServiceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.support.WebExchangeBindException;
import java.util.HashMap;
import java.util.stream.Collectors;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(PaymentProviderServiceException.class)
    public ResponseEntity<HashMap<String, Object>> handlePaymentProviderServiceException(PaymentProviderServiceException ex) {
        
        log.error("Exception PaymentProviderServiceException caught : {} ", ex.getMessage(), ex);
        return generateErrorResponse(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(CustomerNotFoundException.class)
    public ResponseEntity<HashMap<String, Object>> handleCustomerNotFoundException(CustomerNotFoundException ex) {
        log.error("Exception CustomerNotFoundException caught : {} ", ex.getMessage(), ex);
        return generateErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<HashMap<String, Object>> handleRuntimeException(RuntimeException ex) {
        log.error("Runtime Exception : {} ", ex.getMessage(), ex);
        return generateErrorResponse(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(WebExchangeBindException.class)
    public ResponseEntity<HashMap<String, Object>> handleWebExchangeException(WebExchangeBindException ex){
        var error = ex.getBindingResult().getAllErrors().stream()
                        .map(DefaultMessageSourceResolvable::getDefaultMessage)
                        .sorted()
                        .collect(Collectors.joining(""));
        log.error("WebExchangeBindException: {}", ex.getMessage(), ex);
        return generateErrorResponse(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidInputDetailsException.class)
    public ResponseEntity<HashMap<String,Object>> handleInvalidInputDetailsException(InvalidInputDetailsException ex){
         log.error("Exception InvalidInputDetailsException caught: {}", ex.getMessage(), ex);
         return generateErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PaymentNotFoundException.class)
    public ResponseEntity<HashMap<String,Object>> handlePaymentMethodNotFoundException(PaymentNotFoundException ex){
        log.error("Exception PaymentMethodNotFound caught: {}",ex.getMessage(), ex);
        return generateErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    private ResponseEntity<HashMap<String, Object>> generateErrorResponse(String error, HttpStatus status) {
        HashMap<String, Object> errorMessage = new HashMap<>();
        errorMessage.put("message", error);

        return ResponseEntity.status(status).body(errorMessage);
    }
}
