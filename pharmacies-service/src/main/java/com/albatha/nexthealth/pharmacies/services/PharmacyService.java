package com.albatha.nexthealth.pharmacies.services;

import com.albatha.nexthealth.pharmacies.Mapper;
import com.albatha.nexthealth.pharmacies.dto.PharmacyDTO;
import com.albatha.nexthealth.pharmacies.repositories.PharmacyRepository;
import com.albatha.nexthealth.pharmacies.transformer.PharmacyMapper;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class PharmacyService {
    PharmacyRepository pharmaciesRepository;
    Mapper mapper;

    public PharmacyService(PharmacyRepository pharmaciesRepository,Mapper mapper) {
        this.pharmaciesRepository = pharmaciesRepository;
        this.mapper = mapper;
    }
    private Flux<PharmacyDTO> listOfPharmaciesWithInDeliveryRadius(Point point) {
        return pharmaciesRepository
                .findWithinDeliveryRadius(point)
                .map(mapper::convertPharmacyEntityToDTO);
    }

}
