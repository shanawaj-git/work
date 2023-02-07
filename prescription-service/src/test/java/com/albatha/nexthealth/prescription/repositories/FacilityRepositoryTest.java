package com.albatha.nexthealth.prescription.repositories;

import com.albatha.nexthealth.prescription.builders.FacilityBuilder;
import com.albatha.nexthealth.prescription.domain.Facility;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;

import static com.albatha.nexthealth.prescription.utils.CustomAssertions.shouldBeSame;

@EmbeddedKafka
@DirtiesContext
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class FacilityRepositoryTest {

    @Autowired
    private FacilityRepository facilityRepository;

    @Test
    void shouldReturnFacilityForGivenFacId() {
        Facility healthFirstClinic = new FacilityBuilder()
                .facId("HEA-864-325")
                .name("Health First Clinic")
                .build();
        Facility primeHealthClinic = new FacilityBuilder()
                .name("Prime Health")
                .facId("HEA-593-321")
                .build();

        facilityRepository.saveAll(List.of(healthFirstClinic, primeHealthClinic));

        Facility response = facilityRepository.findFacilitiesByFacId(healthFirstClinic.getFacId());
        shouldBeSame(healthFirstClinic, response);
    }

    @Test
    void shouldReturnEmptyWhenFacilityDoesNotExistForGivenFacId() {
        String randomFacId = "HEA-342-898";
        Facility healthFirstClinic = new FacilityBuilder()
                .facId("HEA-864-325")
                .name("Health First Clinic")
                .build();

        facilityRepository.saveAll(List.of(healthFirstClinic));

        Facility response = facilityRepository.findFacilitiesByFacId(randomFacId);
        Assertions.assertNull(response);
    }
}