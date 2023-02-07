package com.albatha.nexthealth.prescription.repositories;

import com.albatha.nexthealth.prescription.builders.AddressBuilder;
import com.albatha.nexthealth.prescription.domain.Address;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.test.annotation.DirtiesContext;
import java.util.Set;

@EmbeddedKafka
@Slf4j
@DirtiesContext
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AddressRepositoryTest {
    @Autowired
    private AddressRepository addressRepository;

    @BeforeEach
    void clean() {
        addressRepository.deleteAll();
    }

    @Test
    void shouldSaveAnAddress() {
        Address address = new AddressBuilder().build();

        addressRepository.save(address);

        Set<Address> savedAddresses = addressRepository.findAddressByPostalCodeAndAddressLine1AndAddressLine2(
                address.getPostalCode(), address.getAddressLine1(), address.getAddressLine2());

        Assertions.assertEquals(1, savedAddresses.size());
    }

}