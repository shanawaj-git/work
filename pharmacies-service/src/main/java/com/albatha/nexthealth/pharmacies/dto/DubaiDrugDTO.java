package com.albatha.nexthealth.pharmacies.dto;

import com.opencsv.bean.CsvBindByName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DubaiDrugDTO {
    @CsvBindByName(column = "STATUS")
    private String status;
    @CsvBindByName(column = "DDC_CODE")
    private String ddcCode;
    @CsvBindByName(column = "TRADE_NAME")
    private String tradeName;
    @CsvBindByName(column = "SCIENTIFIC_CODE")
    private String scientificCode;
    @CsvBindByName(column = "SCIENTIFIC_NAME")
    private String scientificName;
    @CsvBindByName(column = "INGREDIENT_STRENGTH")
    private String ingredientStrength;
    @CsvBindByName(column = "DOSAGE_FORM_PACKAGE")
    private String dosageForm;
    @CsvBindByName(column = "ROUTE_OF_ADMIN")
    private String routeOfAdmin;
    @CsvBindByName(column = "PACKAGE_PRICE")
    private String packagePrice;
    @CsvBindByName(column = "GRANULAR_UNIT")
    private String granularUnit;
    @CsvBindByName(column = "MANUFACTURER")
    private String manufacturer;
    @CsvBindByName(column = "REGISTERED_OWNER")
    private String registeredOwner;
    @CsvBindByName(column = "UPDATED_DATE")
    private String updatedDate;
    @CsvBindByName(column = "SOURCE")
    private String source;
    @CsvBindByName(column = "IS_EBP")
    private String isEbp;
}
