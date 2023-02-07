package com.albatha.nexthealth.pharmacies.migration;

import com.albatha.nexthealth.pharmacies.model.Drug;
import io.mongock.api.annotations.ChangeUnit;
import io.mongock.api.annotations.Execution;
import io.mongock.api.annotations.RollbackExecution;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;

import java.io.IOException;
import java.util.List;

@Slf4j
@ChangeUnit(id = "initialise-drugs-data", order = "001", author = "Juba")
public class DrugsDataInitialisation {

    ReactiveMongoTemplate reactiveMongoTemplate;

    private static final String DRUGS_CSV_FILE_NAME = "drugs-data.csv";

    public DrugsDataInitialisation(ReactiveMongoTemplate template) {
        this.reactiveMongoTemplate = template;
    }

    @Execution
    public void execution() throws IOException {
        log.info("Running drug data initialisation");
        List<Drug> drugs = DataInitialisation.readDubaiDrugsDataCsv(DRUGS_CSV_FILE_NAME);
        reactiveMongoTemplate.insertAll(drugs).collectList().block();
    }

    @RollbackExecution
    public void rollBackExecution() {
        log.info("Rolling back execution");
    }
}
