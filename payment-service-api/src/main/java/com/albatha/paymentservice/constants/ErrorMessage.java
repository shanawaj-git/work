package com.albatha.paymentservice.constants;

public enum ErrorMessage {

    CUSTOMER_NOT_FOUND("Customer not found"),
    PAYMENT_NOT_FOUND("No payment methods found"),
    INVALID_PAYMENT_METHOD("There is no payment method associated with the customer provided"),

    EMAIL_VALIDATION_EXCEPTION("Please enter a valid valid email address"),
    CREATE_PAYMENT_METHOD_STRIPE("Exception while creating Payment Method in Stripe"),

    ATTACH_PAYMENT_METHOD_STRIPE("Exception while Attaching Customer to payment method in Stripe"),
    UPDATE_PAYMENT_METHOD_STRIPE("Exception while updating Payment Method in Stripe"),

    CREATE_CUSTOMER_EXCEPTION("Could not create customer on Stripe"),

    STRIPE_APP_CONFIG_EXCEPTION("Invalid app config for Stripe"),
    STRIPE_PAYMENT_TYPE_EXCEPTION("Payment Type is mandatory"),

    STRIPE_CUSTOMER_CREATE_EXCEPTION("Exception while create Customer Method in Stripe"),
    STRIPE_DELETE_PAYMENT_METHOD_EXCEPTION("Exception while delete Payment Method in Stripe");
    public final String message;

    ErrorMessage(String message) {
        this.message = message;
    }
}

