package com.albatha.paymentservice.dto;

import com.albatha.paymentservice.domain.Event;
import com.albatha.paymentservice.dto.output.PaymentMethodDeleteOutputDTO;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class PaymentMethodDeleteEvent extends Event<PaymentMethodDeleteOutputDTO> {
    public PaymentMethodDeleteEvent(String topic, String eventType, PaymentMethodDeleteOutputDTO data) {
        this.topic = topic;
        this.eventType = eventType;
        this.data = data;

    }
}
