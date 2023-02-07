package com.albatha.paymentservice.service.provider;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentMethodProviderData {

    private String providerPaymentMethodId;
    private Object metadata;
}
