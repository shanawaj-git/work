package com.albatha.nexthealth.prescription.service.impl;

import com.albatha.nexthealth.prescription.domain.Address;
import com.albatha.nexthealth.prescription.domain.Prescription;
import com.albatha.nexthealth.prescription.repositories.AddressRepository;
import com.albatha.nexthealth.prescription.service.AddressService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AddressServiceImpl implements AddressService {

    final AddressRepository addressRepository;

    public AddressServiceImpl(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public void addOrUpdateAddress(Prescription prescription) {
        Set<Address> addressSet = prescription.getPatient().getAddressSet().stream().map(add -> {
            Set<Address> existingAddressSet = addressRepository.findAddressByPostalCodeAndAddressLine1AndAddressLine2(add.getPostalCode(), add.getAddressLine1(), add.getAddressLine2());
            if (!CollectionUtils.isEmpty(existingAddressSet) ) {
                Address existingAddressEntity = existingAddressSet.stream().findFirst().orElse(null);
                Long addressId = existingAddressEntity.getAddressId();
                BeanUtils.copyProperties(add, existingAddressEntity, "createdDate");
                existingAddressEntity.setAddressId(addressId);
                return existingAddressEntity;
            } else return add;
        }).collect(Collectors.toSet());
        prescription.getPatient().setAddressSet(addressSet);
    }


}
