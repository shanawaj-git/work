package com.albatha.nexthealth.pharmacies.model;

public enum TimeUnit {
    DAY("day"),
    WEEK("week"),
    MONTH("month");
    public final String label;
    private TimeUnit(String label) {
        this.label = label;
    }

}
