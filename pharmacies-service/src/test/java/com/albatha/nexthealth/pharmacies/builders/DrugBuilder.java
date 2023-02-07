package com.albatha.nexthealth.pharmacies.builders;

import com.albatha.nexthealth.pharmacies.defaultData.DefaultDrugData;
import com.albatha.nexthealth.pharmacies.model.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class DrugBuilder {
    private UUID id = UUID.randomUUID();
    private String brandName = DefaultDrugData.BRAND_NAME;
    private String genericName = DefaultDrugData.GENERIC_NAME;
    private Integer packageQuantity = DefaultDrugData.PACKAGE_QUANTITY;
    private String form = DefaultDrugData.FORM;
    private String strength = DefaultDrugData.STRENGTH;
    private String dosageUnit = DefaultDrugData.DOSAGE_UNIT;
    private String ingredients = DefaultDrugData.INGREDIENTS;
    private Pricing price = DefaultDrugData.PRICE;
    private List<Code> codes = DefaultDrugData.CODES;
    private DrugStatus status = DefaultDrugData.STATUS;
    private Manufacturer manufacturer = DefaultDrugData.MANUFACTURER;

    public Drug build() {
        return new Drug(
                id,
                brandName,
                genericName,
                packageQuantity,
                form,
                strength,
                dosageUnit,
                ingredients,
                price,
                codes,
                status,
                manufacturer
        );
    }
}