package com.albatha.paymentservice.model;

public enum RefundEventType {
    CREATED,
    PENDING,
    REQUIRES_ACTION,
    CANCELLED,
    SUCCEEDED,
    FAILED
}
