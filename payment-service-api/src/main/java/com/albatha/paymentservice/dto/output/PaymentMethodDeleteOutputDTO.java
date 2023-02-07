package com.albatha.paymentservice.dto.output;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentMethodDeleteOutputDTO {

    boolean success;
    UUID customerId;
    UUID paymentMethodId;
}
