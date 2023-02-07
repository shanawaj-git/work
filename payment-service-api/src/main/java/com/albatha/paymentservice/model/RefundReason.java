package com.albatha.paymentservice.model;

public enum RefundReason {
    DUPLICATE,
    FRAUDULENT,
    REQUESTED_BY_CUSTOMER,
    EXPIRED_UNCAPTURED_CHARGE
}
