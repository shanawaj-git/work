package com.albatha.nexthealth.pharmacies.dto;

import com.albatha.nexthealth.pharmacies.model.Address;
import com.albatha.nexthealth.pharmacies.model.Contact;
import com.albatha.nexthealth.pharmacies.model.OpeningHour;
import com.albatha.nexthealth.pharmacies.model.PharmacyBrand;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PharmacyDTO {
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
    private double distanceCalculated;
}
