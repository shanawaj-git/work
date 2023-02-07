package com.albatha.nexthealth.pharmacies.model;

public enum Currency {
    AED("aed"),
    USD("usd");
    public final String label;

    private Currency(String label) {
        this.label = label;
    }
}
