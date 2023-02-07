package com.albatha.nexthealth.patientsservice.graphql.error;

public enum PatientServiceErrors {

    NOT_FOUND("PATIENT_ERR_001", "No Patient found matching the supplied patient id ");

    public final String code;
    public final String message;

    private PatientServiceErrors(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
