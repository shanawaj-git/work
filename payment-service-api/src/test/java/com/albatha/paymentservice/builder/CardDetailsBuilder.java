package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.defaultData.DefaultCardDetails;
import com.albatha.paymentservice.model.CardDetails;
import com.albatha.paymentservice.model.CardFundingType;
import com.albatha.paymentservice.model.CvcCheckStatus;

public class CardDetailsBuilder {
    String maskedCardNumber = DefaultCardDetails.maskedCardNumber;
    String expiryMonth = DefaultCardDetails.expiryMonth;
    String expiryYear = DefaultCardDetails.expiryYear;
    String nameOnCard = DefaultCardDetails.nameOnCard;
    CvcCheckStatus cvcCheckStatus = CvcCheckStatus.PASS;
    CardFundingType funding = CardFundingType.DEBIT;

    public CardDetails build() {
        return new CardDetails(maskedCardNumber, expiryMonth, expiryYear, nameOnCard, cvcCheckStatus, funding);
    }
}
