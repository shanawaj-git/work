package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.model.AppConfig;
import com.albatha.paymentservice.model.PaymentMethodType;
import com.albatha.paymentservice.model.PaymentProvider;

import java.util.List;

public class AppConfigBuilder {

    private PaymentProvider provider;
    private Object providerConfig;
    private List<PaymentMethodType> paymentMethodTypes = List.of(PaymentMethodType.CARD);

    public AppConfig build() {
        return new AppConfig(provider, providerConfig, paymentMethodTypes);
    }

    public AppConfigBuilder providerConfig(Object providerConfig) {
        this.providerConfig = providerConfig;
        return this;
    }

    public AppConfigBuilder paymentMethodTypes(List<PaymentMethodType> paymentMethodTypes) {
        this.paymentMethodTypes = paymentMethodTypes;
        return this;
    }

    public AppConfigBuilder paymentProvider(PaymentProvider paymentProvider) {
        this.provider = paymentProvider;
        return this;
    }
}
