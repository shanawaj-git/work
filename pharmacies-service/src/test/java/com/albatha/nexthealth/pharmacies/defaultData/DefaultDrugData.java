package com.albatha.nexthealth.pharmacies.defaultData;

import com.albatha.nexthealth.pharmacies.model.*;

import java.util.*;

public class DefaultDrugData {
    public static final UUID ID = UUID.randomUUID();
    public static final String BRAND_NAME = "SODIUM CHLORIDE & GLUCOSE INTRAVENOUS INFUSION BP 1988";
    public static final String GENERIC_NAME = "SODIUM CHLORIDE & GLUCOSE INTRAVENOUS INFUSION BP 1988";
    public static final Integer PACKAGE_QUANTITY = 1;
    public static final String FORM = "Solution";
    public static final String STRENGTH = "DEXTROSE/SODIUM CHLORIDE [4.3% W/V|0.18% W/V]";
    public static final String DOSAGE_UNIT = "ml";
    public static final String INGREDIENTS = "DEXTROSE/SODIUM CHLORIDE [4.3% W/V|0.18% W/V]";
    public static final Pricing PRICE = new Pricing(14.0);
    public static final List<Code> CODES = List.of(new Code(DrugCodingSystem.DDC, "DDC-231"));
    public static final DrugStatus STATUS = DrugStatus.Active;
    public static final Manufacturer MANUFACTURER = new Manufacturer("Biopharm", "");
}
