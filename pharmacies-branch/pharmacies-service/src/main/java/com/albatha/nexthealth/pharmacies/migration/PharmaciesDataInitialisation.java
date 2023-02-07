package com.albatha.nexthealth.pharmacies.migration;

import com.albatha.nexthealth.pharmacies.model.Pharmacy;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.mongock.api.annotations.ChangeUnit;
import io.mongock.api.annotations.Execution;
import io.mongock.api.annotations.RollbackExecution;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;

import java.io.IOException;
import java.util.List;

@Slf4j
@ChangeUnit(id = "initialise-pharmacies-data", order = "002", author = "Juba")
public class PharmaciesDataInitialisation {

    ReactiveMongoTemplate reactiveMongoTemplate;
    ObjectMapper customObjectMapper;

    private static final String PHARMACIES_JSON_FILE_NAME = "pharmacies-data.json";

    public PharmaciesDataInitialisation(
        ReactiveMongoTemplate template,
        ObjectMapper customObjectMapper
    ) {
        this.reactiveMongoTemplate = template;
        this.customObjectMapper = customObjectMapper;
    }

    @Execution
    public void execution() throws IOException {
        log.info("Running pharmacies data initialisation");
        List<Pharmacy> pharmacies = new DataInitialisation(customObjectMapper)
            .readPharmaciesFromJson(PHARMACIES_JSON_FILE_NAME);
        reactiveMongoTemplate.insertAll(pharmacies).collectList().block();
    }

    @RollbackExecution
    public void rollBackExecution() {
        log.info("Rolling back execution");
    }
}
