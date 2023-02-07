package com.albatha.paymentservice.dto;

import lombok.Data;

@Data
public class CardDetailsDTO {
    private String expiryYear;
    private String expiryMonth;
    private String nameOnCard;
    private String cvcCheckStatus;
    private String funding;
}
