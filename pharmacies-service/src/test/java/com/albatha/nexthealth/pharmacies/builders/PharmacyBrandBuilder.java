package com.albatha.nexthealth.pharmacies.builders;

import com.albatha.nexthealth.pharmacies.defaultData.DefaultPharmacyBrand;
import com.albatha.nexthealth.pharmacies.model.PharmacyBrand;
import java.util.UUID;

public class PharmacyBrandBuilder {

    UUID id = DefaultPharmacyBrand.ID;
    String name = DefaultPharmacyBrand.NAME;

    public PharmacyBrand build() {
        return new PharmacyBrand(id, name);
    }
}
