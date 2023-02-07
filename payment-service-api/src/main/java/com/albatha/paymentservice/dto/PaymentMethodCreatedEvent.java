package com.albatha.paymentservice.dto;

import com.albatha.paymentservice.domain.Event;
import com.albatha.paymentservice.dto.output.PaymentMethodOutputDTO;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class PaymentMethodCreatedEvent extends Event<PaymentMethodOutputDTO> {
    public PaymentMethodCreatedEvent(String topic, String eventType, PaymentMethodOutputDTO data) {
        this.topic = topic;
        this.eventType = eventType;
        this.data = data;
    }
}
