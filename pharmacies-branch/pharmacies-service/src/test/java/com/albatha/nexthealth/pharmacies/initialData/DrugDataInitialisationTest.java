package com.albatha.nexthealth.pharmacies.initialData;

import com.albatha.nexthealth.pharmacies.model.Drug;
import com.albatha.nexthealth.pharmacies.model.DrugStatus;
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

import static com.albatha.nexthealth.pharmacies.migration.DataInitialisation.readDubaiDrugsDataCsv;
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
class DrugDataInitialisationTest {

    @Autowired
    ReactiveMongoTemplate reactiveMongoTemplate;

    @Test
    void shouldThrowAnExceptionWhenGivenCsvFileDoesNotExist() {
        assertThrows(FileNotFoundException.class, () -> readDubaiDrugsDataCsv("dummyFile.csv"));
    }

    @ParameterizedTest
    @ValueSource(strings = {"empty-drugs-test-data.csv", "headers-only-drugs-date.csv"})
    void shouldReturnEmptyListWhenGivenCsvFileIsEmpty(String filename) throws IOException {
        List<Drug> response = readDubaiDrugsDataCsv(filename);

        Assertions.assertEquals(0, response.size());
    }

    @Test
    void shouldReturnListOfDrugsForGivenCsvFile() throws IOException {
        String drugsCsvFile = "drugs-test-data.csv";

        List<Drug> response = readDubaiDrugsDataCsv(drugsCsvFile);

        Assertions.assertEquals(3, response.size());
        Assertions.assertEquals(DrugStatus.Inactive, response.get(0).getStatus());
        Assertions.assertEquals(DrugStatus.Active, response.get(1).getStatus());
        Assertions.assertEquals(DrugStatus.EnteredInError, response.get(2).getStatus());
    }
}
