package com.albatha.paymentservice.util;

import com.albatha.paymentservice.dto.CustomerDTO;
import com.albatha.paymentservice.dto.input.PaymentMethodInputDTO;
import com.albatha.paymentservice.dto.output.PaymentMethodDeleteOutputDTO;
import com.albatha.paymentservice.dto.output.PaymentMethodOutputDTO;
import com.albatha.paymentservice.model.Customer;
import com.albatha.paymentservice.model.PaymentMethod;
import org.junit.jupiter.api.Assertions;

public class CustomAssertion {

    public static void shouldBeSame(PaymentMethod expected, PaymentMethod actual) {
        Assertions.assertEquals(expected.getId(), actual.getId());
        Assertions.assertEquals(expected.getProviderPaymentMethodId(), actual.getProviderPaymentMethodId());
    }
    public static void shouldBeSame(PaymentMethodDeleteOutputDTO expected) {
        Assertions.assertNotNull(expected.getCustomerId());
        Assertions.assertNotNull(expected.getPaymentMethodId());
        Assertions.assertTrue(expected.isSuccess());
    }
    public static void shouldBeSame(PaymentMethodOutputDTO expected, PaymentMethodInputDTO actual) {
        assert expected!=null;
        Assertions.assertEquals(expected.getType(), actual.getType());
        Assertions.assertEquals(expected.getCard().getNameOnCard(), actual.getCard().getNameOnCard());
        Assertions.assertEquals(expected.getBillingDetails().getPhone(), actual.getBillingDetails().getPhone());
        Assertions.assertEquals(expected.getBillingDetails().getEmail(), actual.getBillingDetails().getEmail());
    }
    public static void shouldBeSame(String expected, String actual) {
        Assertions.assertEquals(expected, actual);
    }

    public static void shouldBeSame(CustomerDTO expected, Customer actual) {
        Assertions.assertEquals(expected.getApplicationCustomerId(), actual.getApplicationCustomerId());
        Assertions.assertEquals(expected.getName().getLastName(), actual.getName().getLastName());
    }
}
