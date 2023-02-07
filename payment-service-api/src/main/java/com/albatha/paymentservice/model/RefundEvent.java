package com.albatha.paymentservice.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RefundEvent {
    private RefundEventType eventType;
    private LocalDateTime dateTime;
    private Object metadata;
}
