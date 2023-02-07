package com.albatha.nexthealth.patientsservice.constants;

public enum EventType {
    NEW_PATIENT("patients.new"),
    NEW_ADDRESS("patients.address.new");

    public final String label;

    EventType(String label) {
        this.label = label;
    }
}
