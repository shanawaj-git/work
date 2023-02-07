package com.albatha.paymentservice.service.stripe.constants;

public enum StripeProperties {
    //payment method
    PAYMENT_METHOD_ID("payment_method"),
    PAYMENT_METHOD("payment_method"),
    PAYMENT_METHOD_TYPE("type"),

    //Billing Details
    BILLING_DETAILS("billing_details"),
    BILLING_DETAILS_CITY("city"),
    BILLING_DETAILS_LINE1("line1"),
    BILLING_DETAILS_LINE2("line2"),
    BILLING_DETAILS_COUNTRY("country"),
    BILLING_DETAILS_STATE("state"),
    BILLING_DETAILS_EMAIL("email"),
    BILLING_DETAILS_NAME("name"),
    BILLING_DETAILS_PHONE("phone"),
    BILLING_DETAILS_ADDRESS("address"),

    //card
    CARD("card"),
    CARD_NUMBER("number"),
    CARD_EXP_MONTH("exp_month"),
    CARD_EXP_YEAR("exp_year"),
    CARD_CVC("cvc"),

    //customer
    CUSTOMER_ID("customer"),
    CUSTOMER_NAME("name"),
    CUSTOMER_EMAIL("email"),
    CUSTOMER_PHONE("phone");

    public final String key;
    private StripeProperties(String key) {
        this.key = key;
    }
}

