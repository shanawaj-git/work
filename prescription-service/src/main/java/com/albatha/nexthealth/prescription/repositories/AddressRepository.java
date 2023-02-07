package com.albatha.nexthealth.prescription.repositories;

import com.albatha.nexthealth.prescription.domain.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {


    public Set<Address> findAddressByPostalCodeAndAddressLine1AndAddressLine2(String postalCode,
                                                                              String addressLine1, String addressLine2 );
}
