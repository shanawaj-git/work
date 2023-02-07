package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.dto.BillingDetailsDTO;
import com.albatha.paymentservice.dto.output.CardDetailsOutputDTO;
import com.albatha.paymentservice.dto.output.PaymentMethodOutputDTO;
import com.albatha.paymentservice.dto.output.WalletDetailsOutputDTO;
import com.albatha.paymentservice.model.PaymentMethodType;

public class PaymentMethodOutputDTOBuilder {
    CardDetailsOutputDTO card = new CardDetailsOutputDTOBuilder().build();
    WalletDetailsOutputDTO wallet = null;
    PaymentMethodType type;
    BillingDetailsDTO billingDetails = new BillingDetailsDTOBuilder().build();
    boolean isDefault = true;

    public PaymentMethodOutputDTO build() {
        PaymentMethodOutputDTO paymentMethodOutputDTO = new PaymentMethodOutputDTO();
        paymentMethodOutputDTO.setCard(card);
        paymentMethodOutputDTO.setType(PaymentMethodType.CARD);
        paymentMethodOutputDTO.setBillingDetails(billingDetails);
        return paymentMethodOutputDTO;
    }

    public PaymentMethodOutputDTOBuilder card(CardDetailsOutputDTO card) {
        this.card = card;
        return this;
    }

    public PaymentMethodOutputDTOBuilder wallet(WalletDetailsOutputDTO wallet) {
        this.wallet = wallet;
        return this;
    }

    public PaymentMethodOutputDTOBuilder billingDetails(BillingDetailsDTO billingDetails) {
        this.billingDetails = billingDetails;
        return this;
    }
}
