package com.albatha.nexthealth.pharmacies.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrescribedDrug {
    @Id
    UUID id = UUID.randomUUID();
    @DocumentReference(lazy=true)
    private Drug drug;
    private Dosage dosage;

    public PrescribedDrug(Drug drug, Dosage dosage) {
        this.drug = drug;
        this.dosage = dosage;
    }
}
