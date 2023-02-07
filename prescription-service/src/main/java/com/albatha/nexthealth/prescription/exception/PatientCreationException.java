package com.albatha.nexthealth.prescription.exception;

import lombok.Getter;

@Getter
public class PatientCreationException extends RuntimeException {
    private final String message;

    public PatientCreationException(String message) {
        super(message);
        this.message = message;
    }
}