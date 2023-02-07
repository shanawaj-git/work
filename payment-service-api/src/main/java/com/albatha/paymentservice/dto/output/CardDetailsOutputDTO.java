package com.albatha.paymentservice.dto.output;

import com.albatha.paymentservice.dto.CardDetailsDTO;
import lombok.Data;

@Data
public class CardDetailsOutputDTO extends CardDetailsDTO {
    private String maskedCardNumber;
}
