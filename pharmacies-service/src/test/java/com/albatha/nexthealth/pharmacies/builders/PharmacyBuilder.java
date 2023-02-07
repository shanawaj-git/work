package com.albatha.nexthealth.pharmacies.builders;

import com.albatha.nexthealth.pharmacies.defaultData.DefaultPharmacyData;
import com.albatha.nexthealth.pharmacies.model.*;
import org.springframework.data.geo.Point;

import java.util.List;
import java.util.UUID;

public class PharmacyBuilder {

    UUID id = DefaultPharmacyData.id;
    String name = DefaultPharmacyData.NAME;
    double deliveryRadiusMeters = DefaultPharmacyData.DELIVERY_RADIUS_METERS;
    double deliverySLAMinutes = DefaultPharmacyData.DELIVERY_SLA_MINUTES;
    PharmacyBrand brand = null;
    Address address = null;
    Point location = DefaultPharmacyData.LOCATION;
    Contact contactDetails = null;
    List<OpeningHour> openingHours = DefaultPharmacyData.OPENING_HOURS;
    Boolean deliveryEnabled = DefaultPharmacyData.DELIVERY_ENABLED;
    double distanceCalculated;

    public PharmacyBuilder address(Address address) {
        this.address = address;
        return this;
    }

    public PharmacyBuilder contactDetails(Contact contactDetails) {
        this.contactDetails = contactDetails;
        return this;
    }

    public PharmacyBuilder brand(PharmacyBrand pharmacyBrand) {
        this.brand = pharmacyBrand;
        return this;
    }

    public PharmacyBuilder location(Point location) {
        this.location = location;
        return this;
    }

    public Pharmacy build() {
        return new Pharmacy(
                id,
                name,
                deliveryRadiusMeters,
                deliverySLAMinutes,
                brand,
                address,
                location,
                contactDetails,
                openingHours,
                deliveryEnabled,
                distanceCalculated
        );
    }

}
