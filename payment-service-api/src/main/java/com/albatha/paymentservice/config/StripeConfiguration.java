package com.albatha.paymentservice.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "provider.stripe")
@Getter
@Setter
public class StripeConfiguration {

    private String stripeSecretKey;
    private String stripePublicKey;
    private String stripeAccountId;

}
