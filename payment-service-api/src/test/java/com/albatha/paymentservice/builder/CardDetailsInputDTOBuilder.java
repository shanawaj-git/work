package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.defaultData.DefaultCardDetailsDTO;
import com.albatha.paymentservice.dto.input.CardDetailsInputDTO;

public class CardDetailsInputDTOBuilder {
    String number = DefaultCardDetailsDTO.number;
    String cvc = DefaultCardDetailsDTO.cvc;
    String expiryYear = DefaultCardDetailsDTO.expiryYear;
    String expiryMonth = DefaultCardDetailsDTO.expiryMonth;
    String nameOnCard = DefaultCardDetailsDTO.nameOnCard;
    String funding = DefaultCardDetailsDTO.funding;

    public CardDetailsInputDTO build()
    {
        CardDetailsInputDTO cardDetailsInputDTO= new CardDetailsInputDTO();
        cardDetailsInputDTO.setNumber(number);
        cardDetailsInputDTO.setCvc(cvc);
        cardDetailsInputDTO.setExpiryYear(expiryYear);
        cardDetailsInputDTO.setExpiryMonth(expiryMonth);
        cardDetailsInputDTO.setNameOnCard(nameOnCard);
        cardDetailsInputDTO.setFunding(funding);
        return cardDetailsInputDTO;

    }
}
