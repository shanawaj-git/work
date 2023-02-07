package com.albatha.paymentservice.builder;


import com.albatha.paymentservice.defaultData.DefaultCardDetails;
import com.stripe.model.PaymentMethod;
import com.stripe.model.PaymentMethod.Card;
import com.stripe.model.PaymentMethod.Card.Checks;

import java.util.UUID;

public class StripePaymentMethodBuilder {

    private final Checks checks = getChecks();
    private Card card = getCard(checks);
    private PaymentMethod paymentMethod = getPaymentMethod(card);

    public PaymentMethod build() {
        PaymentMethod stripePaymentMethod = getPaymentMethod(card);
        return stripePaymentMethod;
    }

    private PaymentMethod getPaymentMethod(Card card) {
        PaymentMethod stripePaymentMethod = new PaymentMethod();
        stripePaymentMethod.setId(UUID.randomUUID().toString());
        stripePaymentMethod.setType("card");
        stripePaymentMethod.setCard(card);
        return stripePaymentMethod;
    }

    private Checks getChecks() {
        Checks checks = new Checks();
        checks.setCvcCheck("passed");
        return checks;
    }

    private Card getCard(Checks checks) {
        Card card = new Card();
        card.setChecks(checks);
        card.setExpMonth(Long.parseLong(DefaultCardDetails.expiryMonth));
        card.setExpYear(Long.parseLong(DefaultCardDetails.expiryYear));
        card.setFunding(DefaultCardDetails.funding);
        card.setLast4(DefaultCardDetails.maskedCardNumber);
        return card;
    }

    public StripePaymentMethodBuilder card(Card card) {
        this.card = card;
        return this;
    }

    public StripePaymentMethodBuilder paymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
        return this;
    }
}

