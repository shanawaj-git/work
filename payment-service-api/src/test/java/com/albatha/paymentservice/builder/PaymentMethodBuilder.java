package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.defaultData.DefaultPaymentMethod;
import com.albatha.paymentservice.model.*;

import java.time.LocalDateTime;
import java.util.UUID;

public class PaymentMethodBuilder {
    UUID id = UUID.randomUUID();
    UUID customerId = UUID.randomUUID();
    Customer customer = null;
    UUID applicationId = UUID.randomUUID();
    UUID organizationId = UUID.randomUUID();
    Application application = new ApplicationBuilder().build();
    Organization organization = new OrganizationBuilder().build();
    PaymentMethodType type = PaymentMethodType.CARD;
    BillingDetails billingDetails = new BillingDetailsBuilder().build();
    CardDetails card = new CardDetailsBuilder().build();
    WalletDetails wallet = null;
    boolean isDefault = true;
    LocalDateTime createdAt = LocalDateTime.now();
    String providerPaymentMethodId = DefaultPaymentMethod.providerPaymentMethodId;

    public PaymentMethod build() {
        return new PaymentMethod(id,
                customerId,
                customer,
                type,
                billingDetails,
                card,
                wallet,
                isDefault,
                createdAt,
                providerPaymentMethodId,
                null,
                true);
    }

    public PaymentMethodBuilder card(CardDetails card) {
        this.card = card;
        return this;
    }

    public PaymentMethodBuilder billingDetails(BillingDetails billingDetails) {
        this.billingDetails = billingDetails;
        return this;
    }

    public PaymentMethodBuilder wallet(WalletDetails wallet) {
        this.wallet = wallet;
        return this;
    }

    public PaymentMethodBuilder application(Application application) {
        this.application = application;
        return this;
    }
}

