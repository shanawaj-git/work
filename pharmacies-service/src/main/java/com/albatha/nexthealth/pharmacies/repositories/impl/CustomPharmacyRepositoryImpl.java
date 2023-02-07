package com.albatha.nexthealth.pharmacies.repositories.impl;

import com.albatha.nexthealth.pharmacies.constant.Constants;
import com.albatha.nexthealth.pharmacies.model.Pharmacy;
import com.albatha.nexthealth.pharmacies.repositories.CustomPharmacyRepository;
import com.albatha.nexthealth.pharmacies.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.MongoExpression;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.NearQuery;
import reactor.core.publisher.Flux;

import java.util.Arrays;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.match;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.unwind;

public class CustomPharmacyRepositoryImpl implements CustomPharmacyRepository {
    static final String DISTANCE_BETWEEN_POINTS = "distanceCalculated";
    static final String DELIVERY_RADIUS_METERS = "deliveryRadiusMeters";
    @Autowired
    ReactiveMongoTemplate reactiveMongoTemplate;

    @Override
    public Flux<Pharmacy> findWithinDeliveryRadius(Point point) {
        GeoNearOperation geoNearOperation = getGeoNearOperation(point);
        MatchOperation getGeoNearMatchOperation  = getGeoNearMatch();
        Aggregation aggregation = Aggregation.newAggregation(
                geoNearOperation,
                getGeoNearMatchOperation
        );
        return reactiveMongoTemplate.aggregate(aggregation, Collections.PHARMACIES.name, Pharmacy.class);
    }

    private MatchOperation getGeoNearMatch() {
        final String deliveryRadius = "$".concat(DELIVERY_RADIUS_METERS);
        final String distanceBetweenPoints = "$".concat(DISTANCE_BETWEEN_POINTS);

        return match(Criteria
            .where("$expr")
            .gte(Arrays.asList(deliveryRadius, distanceBetweenPoints)));
    }

    private GeoNearOperation getGeoNearOperation(Point point) {
        WithInQuery
        NearQuery nearQuery = NearQuery
                .near(point)
                .spherical(true)
                .distanceMultiplier(Constants.RADIUS_OF_EARTH);
        return new GeoNearOperation(nearQuery, DISTANCE_BETWEEN_POINTS);
    }

    @Override
    public Flux<Object> findWithinDeliveryRadiusAndPrescriptionNumber(Point point, String prescriptionNumber) {
        GeoNearOperation geoNearOperation = getGeoNearOperation(point);

        Aggregation aggregation = Aggregation.newAggregation(
                prescriptionMatchOperation(prescriptionNumber),
                drugsLookupOperation(),
                projectPrescribedDrugs(),
                unwind("prescribedDrugs"),
                projectDrugsFields(),
                lookupDrugAvailability(),
                unwind("drugAvailabilities"),
                matchDrugQuantity(),
                projectPharmacies(),
                groupByPharmacy(),
                matchAvailableDrugsCount(),
                lookupPharmacies(),
                pharmacyReplaceRootOperation(),
                pharmaciesAndDrugsProjections()
//                ,
//
//                geoNearOperation,
//                getGeoNearMatch()
        );

        return reactiveMongoTemplate.aggregate(aggregation, Collections.PRESCRIPTIONS.name, Object.class);
    }

    private MatchOperation prescriptionMatchOperation(String prescriptionNumber) {
        return new MatchOperation(Criteria.where("prescriptionNumber").is(prescriptionNumber));
    }

    private LookupOperation drugsLookupOperation() {
        return LookupOperation.newLookup()
            .from("drugs")
            .localField("prescribedDrugs.drug")
            .foreignField("_id")
            .as("prescribedDrugs");
    }

    private ProjectionOperation projectPrescribedDrugs() {
        return new ProjectionOperation()
            .and("prescribedDrugs").as("prescribedDrugs")
            .and("prescribedDrugs").project("size").as("prescribedDrugsCount");
    }

    private ProjectionOperation projectDrugsFields() {
        return new ProjectionOperation()
            .andExclude("_id")
            .and("prescribedDrugs._id").as("prescribedDrugId")
            .and("prescribedDrugs.packageQuantity").as("prescribedDrugQuantity")
            .and("prescribedDrugs.code").as("code")
            .and("prescribedDrugsCount").as("prescribedDrugsCount");
    }

    private LookupOperation lookupDrugAvailability() {
        return LookupOperation.newLookup()
            .from("drugAvailability")
            .localField("prescribedDrugId")
            .foreignField("drug")
            .as("drugAvailabilities");
    }

    private MatchOperation matchDrugQuantity() {
        return new MatchOperation(Criteria
            .where("$expr")
            .gte(Arrays.asList("$drugAvailabilities.quantity", "$prescribedDrugQuantity" )));
    }

    private ProjectionOperation projectPharmacies() {
        return new ProjectionOperation()
            .and("drugAvailabilities.pharmacy").as("pharmacy")
            .andInclude("prescribedDrugId")
            .andInclude("prescribedDrugsCount");
    }

    private GroupOperation groupByPharmacy() {
        return new GroupOperation(Fields.from(Fields.field("pharmacy", "pharmacy")))
            .count().as("availableDrugsCount")
            .first("pharmacy").as("pharmacy")
            .first("prescribedDrugsCount").as("prescribedDrugsCount");
    }

    private MatchOperation matchAvailableDrugsCount() {
        return new MatchOperation(Criteria
            .where("$expr")
            .is(Arrays.asList("$availableDrugsCount", "$prescribedDrugsCount" )));
    }

    private LookupOperation lookupPharmacies() {
        return LookupOperation.newLookup()
            .from("pharmacies")
            .localField("_id")
            .foreignField("_id")
            .as("pharmacies");
    }

    private ReplaceRootOperation pharmacyReplaceRootOperation() {
        return Aggregation.replaceRoot()
            .withValueOf(
                ObjectOperators
                    .valueOf(
                        ArrayOperators.ArrayElemAt.arrayOf("pharmacies").elementAt(0)
                    ).mergeWith("$$ROOT")
            );
    }

    private ProjectionOperation pharmaciesAndDrugsProjections() {
        // TODO Add projection class to avoid mentioning all fields here
        return new ProjectionOperation()
            .andInclude("_id")
            .andInclude("name")
            .andInclude("deliveryRadiusMeters")
            .andInclude("deliverySLAMinutes")
            .andInclude("brand")
            .andInclude("location")
            .andInclude("prescribedDrugId")
            .andInclude("prescribedDrugsCount")
            .andInclude("prescribedDrugQuantity")
            .andInclude("brandName")
            .andInclude("genericName")
            .andInclude("codes")
            .andInclude("pricing")
            .andInclude("prescribedDrugsCount")
            .andInclude("drugs");
    }
}
