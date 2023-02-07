package com.albatha.nexthealth.domain.prescriptions;

public enum EventType {

    RECEIVED_PRESCRIPTION("prescriptions.received"),
    NEW_PRESCRIPTION("prescriptions.new")
    ;
    public final String label;

    private EventType(String label) {
        this.label = label;
    }
}
