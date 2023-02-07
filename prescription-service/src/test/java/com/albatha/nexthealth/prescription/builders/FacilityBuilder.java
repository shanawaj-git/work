package com.albatha.nexthealth.prescription.builders;

import com.albatha.nexthealth.prescription.defaultData.DefaultFacilityData;
import com.albatha.nexthealth.prescription.domain.Facility;

import java.sql.Timestamp;

public class FacilityBuilder {

    Long facilityId = DefaultFacilityData.ID;
    String facId = DefaultFacilityData.FAC_ID;
    String name = DefaultFacilityData.NAME;
    String address = DefaultFacilityData.ADDRESS;
    Timestamp createdDate = DefaultFacilityData.CREATED_DATE;

    public FacilityBuilder name(String name) {
        this.name = name;
        return this;
    }

    public FacilityBuilder facId(String facId) {
        this.facId = facId;
        return this;
    }

    public Facility build() {
        return new Facility(
            facilityId,
            facId,
            name,
            address,
            createdDate
        );
    }
}
