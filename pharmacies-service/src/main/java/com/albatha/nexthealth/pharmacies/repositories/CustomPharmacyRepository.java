package com.albatha.nexthealth.pharmacies.repositories;

import com.albatha.nexthealth.pharmacies.model.Pharmacy;
import org.springframework.data.geo.Point;
import reactor.core.publisher.Flux;

public interface CustomPharmacyRepository {
    Flux<Pharmacy> findWithinDeliveryRadius(Point point);
    Flux<Object> findWithinDeliveryRadiusAndPrescriptionNumber(Point point, String prescriptionNumber);
}
