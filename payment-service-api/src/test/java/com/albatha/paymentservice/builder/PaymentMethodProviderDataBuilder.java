package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.service.provider.PaymentMethodProviderData;

public class PaymentMethodProviderDataBuilder {
    private final String providerPaymentMethodId = new StripePaymentMethodBuilder().build().getId();
    private Object metadata = new StripePaymentMethodBuilder().build();

    public PaymentMethodProviderData build() {
        return new PaymentMethodProviderData(providerPaymentMethodId, metadata);
    }

    public PaymentMethodProviderDataBuilder metaData(Object metadata) {
        this.metadata = metadata;
        return this;
    }
}
