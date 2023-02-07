package com.albatha.nexthealth.pharmacies.initialData;

import com.albatha.nexthealth.pharmacies.migration.DataInitialisation;
import com.albatha.nexthealth.pharmacies.model.Pharmacy;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;

@DataMongoTest
@ComponentScan(
    basePackages = {
        "com.albatha.nexthealth.pharmacies",
        "com.albatha.nexthealth.pharmacies",
    }
)
@Slf4j
@ActiveProfiles(value = {"test"})
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@TestPropertySource(properties = {"mongock.enabled=false", "spring.kafka.enabled=false"})
class PharmaciesDataInitialisationTest {

    @Autowired
    ReactiveMongoTemplate reactiveMongoTemplate;

    @Autowired
    ObjectMapper customObjectMapper;

    @Test
    void shouldThrowAnExceptionWhenGivenJsonFileDoesNotExist() {
        assertThrows(FileNotFoundException.class, () ->
            new DataInitialisation(customObjectMapper).readPharmaciesFromJson("dummyFile.json"));
    }

    @ParameterizedTest
    @ValueSource(strings = {"pharmacy/empty-list-pharmacies-data.json"})
    void shouldReturnEmptyListWhenGivenJsonFileIsEmpty(String filename) throws IOException {
        List<Pharmacy> response = new DataInitialisation(customObjectMapper).readPharmaciesFromJson(filename);

        Assertions.assertEquals(0, response.size());
    }

    @Test
    void shouldReturnListOfPharmaciesForGivenJsonFile() throws IOException {
        String pharmaciesFile = "pharmacy/pharmacies-test-data.json";

        List<Pharmacy> response = new DataInitialisation(customObjectMapper).readPharmaciesFromJson(pharmaciesFile);

        Assertions.assertEquals(1, response.size());
    }
}
