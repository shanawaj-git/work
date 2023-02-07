package com.albatha.nexthealth.prescription.graphql.model;

public enum Mutations {
    CREATE_PATIENT("createPatient");

    public final String label;

    Mutations(String label) {
        this.label = label;
    }
}