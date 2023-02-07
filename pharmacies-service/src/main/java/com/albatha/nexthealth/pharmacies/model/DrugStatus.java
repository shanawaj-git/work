package com.albatha.nexthealth.pharmacies.model;

public enum DrugStatus {
    Active("active"),
    Inactive("inactive"),
    EnteredInError("entered-in-error");
    public final String label;
    private DrugStatus(String label) {
        this.label = label;
    }
}
