package com.albatha.paymentservice.service.stripe.params;

import com.albatha.paymentservice.service.stripe.constants.StripeProperties;

import java.util.HashMap;

public class AttachCustomerToPaymentMethodParam extends HashMap<String, Object> {

    public AttachCustomerToPaymentMethodParam(String providerCustomerId) {
        put(StripeProperties.CUSTOMER_ID.key, providerCustomerId);
    }
}
