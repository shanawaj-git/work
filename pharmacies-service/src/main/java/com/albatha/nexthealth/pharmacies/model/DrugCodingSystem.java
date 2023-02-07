package com.albatha.nexthealth.pharmacies.model;

public enum DrugCodingSystem {
    DDC("ddc"),
    SCIENTIFIC("scientific");

    public final String label;
    private DrugCodingSystem(String label) {
        this.label = label;
    }
}
