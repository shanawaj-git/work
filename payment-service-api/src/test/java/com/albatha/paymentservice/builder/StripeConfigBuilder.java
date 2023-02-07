package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.defaultData.DefaultStripeConfig;
import com.albatha.paymentservice.model.stripe.StripeConfig;

public class StripeConfigBuilder {

    String accountId = DefaultStripeConfig.accountId;
    String secret_key = DefaultStripeConfig.secret_key;
    String public_key = DefaultStripeConfig.public_key;

    public StripeConfig build() {
        return new StripeConfig(accountId, secret_key, public_key);
    }
}
