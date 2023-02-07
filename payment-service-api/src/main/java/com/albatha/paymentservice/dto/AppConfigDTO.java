package com.albatha.paymentservice.dto;

import com.albatha.paymentservice.model.PaymentMethodType;
import com.albatha.paymentservice.model.PaymentProvider;
import lombok.Data;

import java.util.List;

@Data
public class AppConfigDTO {
    private PaymentProvider provider;
    private Object providerConfig;
    private List<PaymentMethodType> paymentMethodTypes;
}
