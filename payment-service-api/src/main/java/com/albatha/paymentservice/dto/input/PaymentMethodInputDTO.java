package com.albatha.paymentservice.dto.input;

import com.albatha.paymentservice.dto.PaymentMethodDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentMethodInputDTO extends PaymentMethodDTO {

    private CardDetailsInputDTO card;
    private WalletDetailsInputDTO wallet;
}
