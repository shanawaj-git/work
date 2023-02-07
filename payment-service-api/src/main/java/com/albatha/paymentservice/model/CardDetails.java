package com.albatha.paymentservice.model;

import com.albatha.paymentservice.dto.input.PaymentMethodInputDTO;
import com.albatha.paymentservice.service.provider.PaymentMethodProviderData;
import com.albatha.paymentservice.transformer.PaymentProviderValueConverter;
import com.stripe.model.Card;
import com.stripe.model.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardDetails {
    @NotNull
    private String maskedCardNumber;
    @NotNull
    private String expiryMonth;
    @NotNull
    private String expiryYear;
    @NotNull
    private String nameOnCard;
    @NotNull
    private CvcCheckStatus cvcCheckStatus;
    private CardFundingType funding;
    public CardDetails(PaymentMethodProviderData paymentMethodProviderData, PaymentMethodInputDTO paymentMethodInputDTO) {

        com.stripe.model.PaymentMethod stripePaymentMethod = (com.stripe.model.PaymentMethod) paymentMethodProviderData.getMetadata();
         PaymentMethod.Card card= stripePaymentMethod.getCard();
        this.nameOnCard = paymentMethodInputDTO.getCard().getNameOnCard();
        this.cvcCheckStatus = PaymentProviderValueConverter.cvcCheckMap.get(stripePaymentMethod.getCard().getChecks().getCvcCheck());
        this.expiryMonth = stripePaymentMethod.getCard().getExpMonth().toString();
        this.expiryYear = stripePaymentMethod.getCard().getExpYear().toString();
        this.funding = PaymentProviderValueConverter.cardFundingTypeMap.get(stripePaymentMethod.getCard().getFunding());
        this.maskedCardNumber = stripePaymentMethod.getCard().getLast4();
    }
}
