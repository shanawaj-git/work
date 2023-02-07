package com.albatha.nexthealth.pharmacies.builders;

import com.albatha.nexthealth.pharmacies.model.*;

import java.util.UUID;

public class DrugAvailabilityBuilder {

    public UUID id = UUID.randomUUID();
    public Pharmacy pharmacy = null;
    public Integer quantity = 0;
    public Drug drug = null;

    public DrugAvailabilityBuilder pharmacy(Pharmacy pharmacy) {
        this.pharmacy = pharmacy;
        return this;
    }

    public DrugAvailabilityBuilder drug(Drug drug) {
        this.drug = drug;
        return this;
    }

    public DrugAvailabilityBuilder quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public DrugAvailability build() {
        return new DrugAvailability(
            id,
            pharmacy,
            quantity,
            drug
        );
    }
}
