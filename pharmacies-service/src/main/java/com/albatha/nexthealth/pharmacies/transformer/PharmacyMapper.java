package com.albatha.nexthealth.pharmacies.transformer;

import com.albatha.nexthealth.pharmacies.dto.PharmacyDTO;
import com.albatha.nexthealth.pharmacies.model.Pharmacy;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class PharmacyMapper {

    ModelMapper modelMapper;

    public PharmacyMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public PharmacyDTO convertPharmacyEntityToDTO(Pharmacy pharmacy) {
        return modelMapper.map(pharmacy, PharmacyDTO.class);
    }
}
