package com.albatha.nexthealth.pharmacies.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "pharmacies")
public class Pharmacy {
    @Id
    private UUID id = UUID.randomUUID();
    private String name;
    private double deliveryRadiusMeters;
    private double deliverySLAMinutes;

    @DocumentReference(lazy=true)
    private PharmacyBrand brand;

    private Address address;
    private Point location;
    private Contact contactDetails;
    private List<OpeningHour> openingHours;
    private Boolean deliveryEnabled = true;

    public Pharmacy(
        String name,
        double deliveryRadiusMeters,
        double deliverySLAMinutes,
        PharmacyBrand brand,
        Address address,
        Point location,
        Contact contactDetails,
        List<OpeningHour> openingHours,
        Boolean deliveryEnabled
    ) {
        this.name = name;
        this.deliveryRadiusMeters = deliveryRadiusMeters;
        this.deliverySLAMinutes = deliverySLAMinutes;
        this.brand = brand;
        this.address = address;
        this.location = location;
        this.contactDetails = contactDetails;
        this.openingHours = openingHours;
        this.deliveryEnabled = deliveryEnabled;
    }
}