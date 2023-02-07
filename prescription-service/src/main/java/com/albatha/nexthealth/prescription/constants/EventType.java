package com.albatha.nexthealth.prescription.constants;

public enum EventType {

    RECEIVED_PRESCRIPTION("prescriptions.received"),
    NEW_PRESCRIPTION("prescriptions.new")
    ;
    public final String name;

    private EventType(String name) {
        this.name = name;
    }
}
