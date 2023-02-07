package com.albatha.nexthealth.prescription.builders;

import com.albatha.nexthealth.prescription.defaultData.DefaultDrugData;
import com.albatha.nexthealth.prescription.domain.Drug;
import com.albatha.nexthealth.prescription.domain.PrescribedDrug;
import java.sql.Timestamp;
import java.util.Set;

public class DrugBuilder {
    Long drugId = DefaultDrugData.DRUG_ID;
    Set<PrescribedDrug> prescribedDrugs = DefaultDrugData.PRESCRIBED_DRUGS;
    String name = DefaultDrugData.NAME;
    String code = DefaultDrugData.CODE;
    Timestamp createdDate = DefaultDrugData.CREATED_DATE;

    public DrugBuilder prescribedDrugs(Set<PrescribedDrug> prescribedDrugs) {
        this.prescribedDrugs = prescribedDrugs;
        return this;
    }

    public DrugBuilder code(String code) {
        this.code = code;
        return this;
    }

    public Drug build() {
        return new Drug(
            drugId,
            prescribedDrugs,
            name,
            code,
            createdDate
        );
    }
}
