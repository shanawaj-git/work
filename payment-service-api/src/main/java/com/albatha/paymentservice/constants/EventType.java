package com.albatha.paymentservice.constants;

public enum EventType {
    NEW_PAYMENT_METHOD("paymentmethods.new"), DELETE_PAYMENT_METHOD("paymentmethods.delete"),


    UPDATE_PAYMENT_METHOD("paymentmethods.update");
    public final String label;

    EventType(String label) {
        this.label = label;
    }
}
