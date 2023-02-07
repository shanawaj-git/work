package com.albatha.nexthealth.pharmacies.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "drugs")
public class Drug {
    @Id
    private UUID id = UUID.randomUUID();
    private String brandName;
    private String genericName;
    private Integer packageQuantity;
    private String form;
    private String strength;
    private String dosageUnit;
    private String ingredients;
    private Pricing price;
    private List<Code> codes = new ArrayList<>();
    private DrugStatus status;
    private Manufacturer manufacturer;

    public Drug(
        String brandName,
        String genericName,
        Integer packageQuantity,
        String form,
        String strength,
        String dosageUnit,
        String ingredients,
        Pricing price,
        List<Code> codes,
        DrugStatus status, Manufacturer manufacturer
    ) {
        this.brandName = brandName;
        this.genericName = genericName;
        this.packageQuantity = packageQuantity;
        this.form = form;
        this.strength = strength;
        this.dosageUnit = dosageUnit;
        this.ingredients = ingredients;
        this.price = price;
        this.codes = codes;
        this.status = status;
        this.manufacturer = manufacturer;
    }
}
