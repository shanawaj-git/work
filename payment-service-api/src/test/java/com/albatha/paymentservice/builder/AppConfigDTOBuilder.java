package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.dto.AppConfigDTO;
import com.albatha.paymentservice.model.PaymentMethodType;
import com.albatha.paymentservice.model.PaymentProvider;

import java.util.List;

public class AppConfigDTOBuilder {
     PaymentProvider provider;
     Object providerConfig;
     List<PaymentMethodType> paymentMethodTypes = List.of(PaymentMethodType.CARD);

    public AppConfigDTO build() {
        AppConfigDTO appConfigDTO = new AppConfigDTO();
        appConfigDTO.setProvider(provider);
        appConfigDTO.setProviderConfig(providerConfig);
        appConfigDTO.setPaymentMethodTypes(paymentMethodTypes);
        return appConfigDTO;
    }

    public AppConfigDTOBuilder providerConfig(Object providerConfig)
    {
        this.providerConfig=providerConfig;
        return this;
    }
    public AppConfigDTOBuilder paymentMethodTypes(List<PaymentMethodType> paymentMethodTypes){
        this.paymentMethodTypes = paymentMethodTypes;
        return this;
    }
    public AppConfigDTOBuilder paymentProvider(PaymentProvider paymentProvider){
        this.provider = paymentProvider;
        return this;
    }
}
