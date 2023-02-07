package com.albatha.nexthealth.pharmacies.dto;

import com.albatha.nexthealth.pharmacies.graphql.output.GraphqlData;
import com.albatha.nexthealth.pharmacies.model.Address;
import com.albatha.nexthealth.pharmacies.model.Contact;
import com.albatha.nexthealth.pharmacies.model.OpeningHour;
import com.albatha.nexthealth.pharmacies.model.PharmacyBrand;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;

import java.awt.*;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PharmacyDTO extends GraphqlData {
    private UUID id = UUID.randomUUID();
    private String name;
    private double deliveryRadiusMeters;
    private double deliverySLAMinutes;
    private PharmacyBrand brand;
    private Address address;
    private GeoJsonPoint location;
    private Contact contactDetails;
    private List<OpeningHour> openingHours;
    private Boolean deliveryEnabled = true;

    public PharmacyDTO(String name, double deliveryRadiusMeters, double deliverySLAMinutes, PharmacyBrand brand, Address address, GeoJsonPoint geoJsonPoint, Contact contactDetails, List<OpeningHour> openingHours, Boolean deliveryEnabled) {
       this.name = name;
       this.deliveryRadiusMeters = deliveryRadiusMeters;
       this.deliverySLAMinutes = deliverySLAMinutes;
       this.brand = brand;
       this.address = address;
       this.location =  new GeoJsonPoint(location);
       this.contactDetails = contactDetails;
       this.openingHours = openingHours;
       this.deliveryEnabled = deliveryEnabled;
    }

    @Override
    public Boolean isErroneous() {
        return null;
    }
}
