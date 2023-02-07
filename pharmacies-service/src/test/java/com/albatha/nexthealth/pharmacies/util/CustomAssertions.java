package com.albatha.nexthealth.pharmacies.util;

import com.albatha.nexthealth.pharmacies.model.Pharmacy;
import org.junit.jupiter.api.Assertions;
public class CustomAssertions {
    public static void shouldBeSame(Pharmacy expected, Pharmacy actual) {
        Assertions.assertEquals(expected.getName(), actual.getName());
        Assertions.assertEquals(expected.getDeliveryEnabled(), actual.getDeliveryEnabled());
        Assertions.assertEquals(expected.getDeliveryRadiusMeters(), actual.getDeliveryRadiusMeters());
        Assertions.assertEquals(expected.getDeliverySLAMinutes(), actual.getDeliverySLAMinutes());
        Assertions.assertEquals(expected.getOpeningHours(), actual.getOpeningHours());
    }
}
