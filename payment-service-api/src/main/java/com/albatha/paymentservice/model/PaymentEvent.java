package com.albatha.paymentservice.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentEvent {
    private PaymentEventType eventType;
    private LocalDateTime timestamp;
    private Object metadata;
}