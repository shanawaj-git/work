package com.albatha.paymentservice.model;

public enum PaymentEventType {
    CREATED,
    PROCESSING,
    REQUIRES_PAYMENT_METHOD,
    REQUIRES_ACTION,
    CANCELLED,
    REQUIRES_CAPTURE,
    CAPTURED,
    PARTIALLY_CAPTURED,
    SUCCEDED,
    FAILED
}
