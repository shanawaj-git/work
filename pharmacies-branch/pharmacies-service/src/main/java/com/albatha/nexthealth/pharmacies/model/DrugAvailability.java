package com.albatha.nexthealth.pharmacies.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.UUID;

@Document(collection = "drugAvailability")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DrugAvailability {
    @Id
    private UUID id = UUID.randomUUID();
    @DocumentReference(lazy=true)
    private Pharmacy pharmacy;
    private Integer quantity;
    @DocumentReference(lazy=true)
    private Drug drug;
}
