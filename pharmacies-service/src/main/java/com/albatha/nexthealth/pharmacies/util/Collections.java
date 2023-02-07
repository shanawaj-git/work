package com.albatha.nexthealth.pharmacies.util;

public enum Collections {
    PHARMACIES("pharmacies"),
    PHARMACYBRANDS("pharmacyBrands"),
    PRESCRIPTIONS("prescriptions"),
    DRUG("drug"),
    DRUGAVAILABILITY("drugAvailability");
    public final String name;

    Collections(String name) {
        this.name = name;
    }
}

