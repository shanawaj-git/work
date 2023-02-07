package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.defaultData.DefaultCardDetailsDTO;
import com.albatha.paymentservice.dto.input.CardDetailsInputDTO;
import com.albatha.paymentservice.dto.output.CardDetailsOutputDTO;

public class CardDetailsOutputDTOBuilder {
    String number = DefaultCardDetailsDTO.number;
    String cvc = DefaultCardDetailsDTO.cvc;
    String expiryYear = DefaultCardDetailsDTO.expiryYear;
    String expiryMonth = DefaultCardDetailsDTO.expiryMonth;
    String nameOnCard = DefaultCardDetailsDTO.nameOnCard;
    String cvcCheckStatus = DefaultCardDetailsDTO.cvcCheckStatus;
    String funding = DefaultCardDetailsDTO.funding;

    public CardDetailsOutputDTO build()
    {
        CardDetailsOutputDTO cardDetailsOutputDTO= new CardDetailsOutputDTO();
        cardDetailsOutputDTO.setNameOnCard(number);
        cardDetailsOutputDTO.setExpiryYear(expiryYear);
        cardDetailsOutputDTO.setExpiryMonth(expiryMonth);
        cardDetailsOutputDTO.setNameOnCard(nameOnCard);
        cardDetailsOutputDTO.setCvcCheckStatus(cvcCheckStatus);
        cardDetailsOutputDTO.setFunding(funding);
        return cardDetailsOutputDTO;

    }
}
