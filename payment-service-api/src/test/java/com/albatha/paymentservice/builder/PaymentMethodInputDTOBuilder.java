package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.dto.BillingDetailsDTO;
import com.albatha.paymentservice.dto.input.CardDetailsInputDTO;
import com.albatha.paymentservice.dto.input.PaymentMethodInputDTO;
import com.albatha.paymentservice.dto.input.WalletDetailsInputDTO;
import com.albatha.paymentservice.model.PaymentMethodType;

public class PaymentMethodInputDTOBuilder {
    CardDetailsInputDTO card = new CardDetailsInputDTOBuilder().build();
    WalletDetailsInputDTO wallet = null;
    PaymentMethodType type = PaymentMethodType.CARD;
    BillingDetailsDTO billingDetails = new BillingDetailsDTOBuilder().build();
    boolean isDefault = true;

    public PaymentMethodInputDTO build() {
        PaymentMethodInputDTO paymentMethodInputDTO = new PaymentMethodInputDTO();
        paymentMethodInputDTO.setCard(card);
        paymentMethodInputDTO.setType(type);
        paymentMethodInputDTO.setBillingDetails(billingDetails);
        return paymentMethodInputDTO;
    }

    public PaymentMethodInputDTOBuilder type(PaymentMethodType type) {
        this.type = type;
        return this;
    }

    public PaymentMethodInputDTOBuilder card(CardDetailsInputDTO card) {
        this.card = card;
        return this;
    }

    public PaymentMethodInputDTOBuilder wallet(WalletDetailsInputDTO wallet) {
        this.wallet = wallet;
        return this;
    }

    public PaymentMethodInputDTOBuilder billingDetails(BillingDetailsDTO billingDetails) {
        this.billingDetails = billingDetails;
        return this;
    }
}
