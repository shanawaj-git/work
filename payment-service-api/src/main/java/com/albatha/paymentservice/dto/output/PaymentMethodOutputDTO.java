package com.albatha.paymentservice.dto.output;

import com.albatha.paymentservice.dto.PaymentMethodDTO;
import lombok.Data;

@Data
public class PaymentMethodOutputDTO extends PaymentMethodDTO {

    private CardDetailsOutputDTO card;
    private WalletDetailsOutputDTO wallet;
}
