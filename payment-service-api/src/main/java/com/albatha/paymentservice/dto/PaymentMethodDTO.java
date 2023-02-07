package com.albatha.paymentservice.dto;

import com.albatha.paymentservice.model.PaymentMethodType;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
public class PaymentMethodDTO {
    private UUID id;
    @NotNull(message = "Payment type is mandatory")
    private PaymentMethodType type;

    private BillingDetailsDTO billingDetails;
    private boolean isDefault;
}
