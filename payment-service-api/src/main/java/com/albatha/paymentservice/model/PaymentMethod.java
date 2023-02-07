package com.albatha.paymentservice.model;

import com.albatha.paymentservice.dto.input.PaymentMethodInputDTO;
import com.albatha.paymentservice.service.provider.PaymentMethodProviderData;
import com.albatha.paymentservice.transformer.PaymentProviderValueConverter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentMethod {

    @Id
    private UUID id = UUID.randomUUID();
    private UUID customerId;
    private Customer customer;
    private PaymentMethodType type;
    private BillingDetails billingDetails;
    private CardDetails card;
    private WalletDetails wallet;
    private boolean isDefault;
    private LocalDateTime createdAt;
    private String providerPaymentMethodId;
    private Object providerMetadata;
    private boolean isActive;
    public PaymentMethod(PaymentMethodInputDTO paymentMethodInputDTO,
                         PaymentMethodProviderData paymentMethodProviderData,
                         BillingDetails billingDetails,
                         CardDetails cardDetails,
                         Customer customer
    ) {
        com.stripe.model.PaymentMethod stripePaymentMethod = (com.stripe.model.PaymentMethod) paymentMethodProviderData.getMetadata();

        this.providerPaymentMethodId = stripePaymentMethod.getId();
        this.type = PaymentProviderValueConverter.paymentMethodMap.get(stripePaymentMethod.getType());
        this.isDefault = paymentMethodInputDTO.isDefault();
        this.billingDetails = billingDetails;
        this.card = cardDetails;
        this.isActive = true;
        this.customerId = customer.getId();
        createdAt=LocalDateTime.now();
    }
}
