package com.albatha.paymentservice.service.stripe.params;

import com.albatha.paymentservice.dto.input.PaymentMethodInputDTO;
import com.albatha.paymentservice.service.stripe.constants.StripeProperties;
import com.albatha.paymentservice.transformer.PaymentProviderValueConverter;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class PaymentMethodParams extends HashMap<String, Object> {
    public PaymentMethodParams(PaymentMethodInputDTO paymentMethodInputDTO,String action) {
        Map<String, Object> card = new HashMap<>();

        Optional.ofNullable(paymentMethodInputDTO.getBillingDetails()).ifPresent(billingDetailsDTO -> {

            Map<String, Object> billing_details = new HashMap<>();
            Map<String, Object> address = null;

       if(billingDetailsDTO.getAddress()!=null) {
           address=new HashMap<>();
           address.put(StripeProperties.BILLING_DETAILS_CITY.key, billingDetailsDTO.getAddress().getCity());
           address.put(StripeProperties.BILLING_DETAILS_LINE1.key, billingDetailsDTO.getAddress().getLine1());
           address.put(StripeProperties.BILLING_DETAILS_LINE2.key, billingDetailsDTO.getAddress().getLine2());
           address.put(StripeProperties.BILLING_DETAILS_COUNTRY.key, billingDetailsDTO.getAddress().getCountry());
           address.put(StripeProperties.BILLING_DETAILS_STATE.key, billingDetailsDTO.getAddress().getState());
       }
            billing_details.put(StripeProperties.BILLING_DETAILS_EMAIL.key, billingDetailsDTO.getEmail());
            billing_details.put(StripeProperties.BILLING_DETAILS_NAME.key, billingDetailsDTO.getName().getFullName());
            billing_details.put(StripeProperties.BILLING_DETAILS_PHONE.key, billingDetailsDTO.getPhone());
            billing_details.put(StripeProperties.BILLING_DETAILS_ADDRESS.key, address);

            put(StripeProperties.BILLING_DETAILS.key, billing_details);

        });

        card.put(StripeProperties.CARD_EXP_MONTH.key, paymentMethodInputDTO.getCard().getExpiryMonth());
        card.put(StripeProperties.CARD_EXP_YEAR.key, paymentMethodInputDTO.getCard().getExpiryYear());

        if(action.equals("create"))
        {
            card.put(StripeProperties.CARD_NUMBER.key, paymentMethodInputDTO.getCard().getNumber());
            card.put(StripeProperties.CARD_CVC.key, paymentMethodInputDTO.getCard().getCvc());
            put(StripeProperties.PAYMENT_METHOD_TYPE.key, PaymentProviderValueConverter.paymentMethodReverseMap.get(paymentMethodInputDTO.getType()));
        }
        put(StripeProperties.CARD.key, card);
    }
}
