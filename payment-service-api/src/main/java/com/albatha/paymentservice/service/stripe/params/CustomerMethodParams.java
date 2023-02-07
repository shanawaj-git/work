package com.albatha.paymentservice.service.stripe.params;

import com.albatha.paymentservice.dto.CustomerDTO;
import com.albatha.paymentservice.model.stripe.StripeConfig;
import com.albatha.paymentservice.service.stripe.constants.StripeProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.Stripe;

import java.util.HashMap;


public class CustomerMethodParams extends HashMap<String, Object> {
    public CustomerMethodParams(CustomerDTO customerDTO){
        put(StripeProperties.CUSTOMER_NAME.key, customerDTO.getName().getFirstName());
        put(StripeProperties.CUSTOMER_EMAIL.key, customerDTO.getEmail());
        put(StripeProperties.CUSTOMER_PHONE.key, customerDTO.getPhone());
        StripeConfig stripeConfig = new ObjectMapper().convertValue(  customerDTO.getApplication().getAppConfig().getProviderConfig(), StripeConfig.class);
        Stripe.apiKey = stripeConfig.getSecret_key();
    }
}
