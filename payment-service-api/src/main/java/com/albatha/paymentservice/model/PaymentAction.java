package com.albatha.paymentservice.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentAction {
    private PaymentActionType type;
    private String targetUrl;
    private String returnUrl;
}
