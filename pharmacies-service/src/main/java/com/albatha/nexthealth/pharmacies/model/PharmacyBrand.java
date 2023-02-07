package com.albatha.nexthealth.pharmacies.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "pharmacyBrands")
public class PharmacyBrand {

    @Id
    private UUID id= UUID.randomUUID();;
    private String name;

}

