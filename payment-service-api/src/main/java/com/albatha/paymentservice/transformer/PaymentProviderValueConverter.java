package com.albatha.paymentservice.transformer;

import com.albatha.paymentservice.model.CardFundingType;
import com.albatha.paymentservice.model.CvcCheckStatus;
import com.albatha.paymentservice.model.PaymentMethodType;

import java.util.Map;

public class PaymentProviderValueConverter {

    private PaymentProviderValueConverter()
    {
        throw new IllegalStateException("Utility class PaymentProviderValueConverter");
    }
    public static final Map<String, PaymentMethodType> paymentMethodMap =  java.util.Map.of(
                                                            "card", PaymentMethodType.CARD
    );
    public static final Map<String, CvcCheckStatus> cvcCheckMap =  java.util.Map.of(
                                                                "failed", CvcCheckStatus.FAILED,
                                                                "passed", CvcCheckStatus.PASS,
                                                            "unchecked", CvcCheckStatus.UNCHECKED
    );
    public static final Map<String, CardFundingType> cardFundingTypeMap = java.util.Map.of(
                                                    "debit", CardFundingType.DEBIT,
                                                    "credit", CardFundingType.CREDIT
    );
    public static final Map<PaymentMethodType, String> paymentMethodReverseMap = java.util.Map.of(
                                                    PaymentMethodType.CARD, "card",
                                                    PaymentMethodType.WALLET, "wallet"
   );
}

