package com.albatha.nexthealth.pharmacies.migration;

import com.albatha.nexthealth.pharmacies.model.Pharmacy;
import io.mongock.api.annotations.ChangeUnit;
import io.mongock.api.annotations.Execution;
import io.mongock.api.annotations.RollbackExecution;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeospatialIndex;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@ChangeUnit(id = "location-index-creation", order = "003", author = "Shanawaj")
public class LocationIndexCreation {
    @Autowired
    ReactiveMongoTemplate reactiveMongoTemplate;

    public LocationIndexCreation(ReactiveMongoTemplate template) {
        this.reactiveMongoTemplate = template;
    }

    @Execution
    public void execution() throws IOException {
        log.info("Running PharmacyLocationIndex");
        reactiveMongoTemplate.indexOps(Pharmacy.class)
                        .ensureIndex(new GeospatialIndex("location")
                        .typed(GeoSpatialIndexType.GEO_2DSPHERE))
                        .block();
    }

    @RollbackExecution
    public void rollBackExecution() {
        log.info("Rolling back PharmacyLocationIndex execution");
    }
}
