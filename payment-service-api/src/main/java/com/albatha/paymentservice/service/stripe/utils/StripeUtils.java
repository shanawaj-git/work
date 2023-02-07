package com.albatha.paymentservice.service.stripe.utils;


import com.albatha.paymentservice.constants.ErrorMessage;
import com.albatha.paymentservice.model.Application;
import com.albatha.paymentservice.model.stripe.StripeConfig;
import com.albatha.paymentservice.service.provider.exception.PaymentProviderServiceException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.net.RequestOptions;

import java.util.Optional;

public class StripeUtils {
    private StripeUtils() {
        throw new IllegalStateException("Utility class");
    }
    public static RequestOptions getRequestOptions(Application application) {
        StripeConfig config = new ObjectMapper().convertValue(application.getAppConfig().getProviderConfig(), StripeConfig.class);
        if (isValid(config)) {
            return RequestOptions.builder()
                    .setApiKey(config.getSecret_key())
                    .setStripeAccount(config.getAccountId())
                    .build();
        } else {
            throw new PaymentProviderServiceException(ErrorMessage.STRIPE_APP_CONFIG_EXCEPTION);
        }
    }
    private static boolean isValid(StripeConfig config) {
       return  Optional.of(config.getSecret_key()).isPresent();
    }
}
