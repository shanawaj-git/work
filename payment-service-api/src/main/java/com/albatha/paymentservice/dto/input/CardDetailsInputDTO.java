package com.albatha.paymentservice.dto.input;

import com.albatha.paymentservice.dto.CardDetailsDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CardDetailsInputDTO extends CardDetailsDTO {
    private String number;
    private String cvc;
}
