package com.albatha.nexthealth.pharmacies.Repositories;

import com.albatha.nexthealth.pharmacies.builders.*;
import com.albatha.nexthealth.pharmacies.migration.LocationIndexCreation;
import com.albatha.nexthealth.pharmacies.model.*;
import com.albatha.nexthealth.pharmacies.repositories.PharmacyRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.reactivestreams.Publisher;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;

import java.io.IOException;
import java.util.List;

import static com.albatha.nexthealth.pharmacies.util.CustomAssertions.shouldBeSame;
@DataMongoTest
class PharmacyRepositoryTest {
    @Autowired
    PharmacyRepository pharmaciesRepositories;
    @Autowired
    ReactiveMongoTemplate reactiveMongoTemplate;
    Pharmacy pharmacy1;
    Pharmacy pharmacy2;
    Point point;
    Publisher<Pharmacy> persistedPharmacy;

    @BeforeEach
    void setData() throws IOException {
        reactiveMongoTemplate.dropCollection("addresses").block();
        reactiveMongoTemplate.dropCollection("pharmacies").block();
        reactiveMongoTemplate.dropCollection("drugs").block();
        reactiveMongoTemplate.dropCollection("drugAvailability").block();
        reactiveMongoTemplate.dropCollection("pharmacyBrands").block();
        reactiveMongoTemplate.dropCollection("prescriptions").block();

        Address address = new AddressBuilder().build();
        PharmacyBrand brand = new PharmacyBrandBuilder().build();
        Contact contact = new ContactDetailsBuilder().build();
        pharmacy1 = new PharmacyBuilder()
                .contactDetails(contact)
                .address(address)
                .brand(brand)
                .build();
        pharmacy2=new Pharmacy();
        BeanUtils.copyProperties(pharmacy1,pharmacy2);
        pharmacy2.setLocation(new Point(25.116332420620918, 55.376745423128185));
        pharmacy2.setName("Aster Pharmacy");
        point = new Point(25.122197394298606, 55.375365224818346);
        new LocationIndexCreation(reactiveMongoTemplate).execution();
        pharmaciesRepositories.deleteAll().block();

    }

    @Test
    void shouldFindPharmaciesWhereUserLocationIsWithinDeliveryRadius() {
        pharmacy1.setDeliveryRadiusMeters(300);
        pharmaciesRepositories.saveAll(List.of(pharmacy1,pharmacy2)).collectList().block();

        List<Pharmacy> retrievedPharmacy = pharmaciesRepositories
                .findWithinDeliveryRadius(point)
                .collectList()
                .block();
        retrievedPharmacy.forEach(expectedPharmacy -> shouldBeSame(expectedPharmacy, pharmacy1));
    }

    @Test
    void shouldNotFindPharmaciesWhereUserLocationIsWithinDeliveryRadius() {
        pharmacy1.setDeliveryRadiusMeters(250);
        pharmaciesRepositories.save(pharmacy1).block();

        List<Pharmacy> retrievedPharmacy = pharmaciesRepositories
                .findWithinDeliveryRadius(point)
                .collectList()
                .block();

        Assertions.assertEquals(0, retrievedPharmacy.size());
    }

    @Test
    void shouldFindPharmaciesWhereUserLocationIsOnBoundryOfDeliveryRadius() {
        pharmacy1.setDeliveryRadiusMeters(297.5);
        pharmaciesRepositories.save(pharmacy1).block();

        List<Pharmacy> retrievedPharmacy = pharmaciesRepositories
                .findWithinDeliveryRadius(point)
                .collectList()
                .block();

        retrievedPharmacy.forEach(expectedPharmacy -> shouldBeSame(expectedPharmacy, pharmacy1));
    }

    @Test
    void shouldFindPharmaciesWhereUserLocationAndPharmacyLocationAreSame() {
        pharmacy1.setDeliveryRadiusMeters(300);
        pharmacy1.setLocation(point);
        pharmaciesRepositories.save(pharmacy1).block();
        List<Pharmacy> retrievedPharmacy = pharmaciesRepositories
            .findWithinDeliveryRadius(point)
            .collectList()
            .block();
        retrievedPharmacy.forEach(expectedPharmacy -> shouldBeSame(expectedPharmacy, pharmacy1));
    }

    @Test
    void shouldReturnPharmaciesThatDeliversPrescribedDrugs() {
        pharmacy1.setDeliveryRadiusMeters(300);
        pharmacy1.setLocation(point);
        Drug drug = new DrugBuilder().build();
        PrescribedDrug prescribedDrug = new PrescribedDrugBuilder().build();
        List<PrescribedDrug> prescribedDrugs = List.of(prescribedDrug);
        Prescription prescription = new PrescriptionBuilder().prescribedDrugs(prescribedDrugs).build();
        DrugAvailability drugAvailability = new DrugAvailabilityBuilder()
            .drug(drug)
            .pharmacy(pharmacy1)
            .quantity(3)
            .build();

        reactiveMongoTemplate.save(pharmacy1).block();
        reactiveMongoTemplate.save(drug).block();
        reactiveMongoTemplate.save(drugAvailability).block();
        reactiveMongoTemplate.save(prescribedDrug).block();
        reactiveMongoTemplate.save(prescription).block();

        List<Pharmacy> response = pharmaciesRepositories.findWithinDeliveryRadius(point).collectList().block();

        Assertions.assertNotNull(response);
        Assertions.assertEquals(1, response.size());
    }

    @Test
    void shouldReturnEmptyListWhenPharmacyDoesNotDeliverAllPrescribedDrugs() {
        pharmacy1.setDeliveryRadiusMeters(300);
        pharmacy1.setLocation(point);

        Drug drug = new DrugBuilder().build();
        PrescribedDrug prescribedDrug = new PrescribedDrugBuilder().drug(drug).build();
        List<PrescribedDrug> prescribedDrugs = List.of(prescribedDrug);
        Prescription prescription = new PrescriptionBuilder().prescribedDrugs(prescribedDrugs).build();
        DrugAvailability drugAvailability = new DrugAvailabilityBuilder().drug(drug).pharmacy(pharmacy1).quantity(3).build();

        reactiveMongoTemplate.save(pharmacy1).block();
        reactiveMongoTemplate.save(drug).block();
        reactiveMongoTemplate.save(prescribedDrug).block();
        reactiveMongoTemplate.save(prescription).block();
        reactiveMongoTemplate.save(drugAvailability).block();

        List<Object> response = pharmaciesRepositories.findWithinDeliveryRadiusAndPrescriptionNumber(
                point,
                prescription.getPrescriptionNumber()
            ).collectList().block();

        Assertions.assertNotNull(response);
        Assertions.assertEquals(1, response.size());
    }

    @Test
    void shouldReturnEmptyListWhenGivenPrescriptionDoesNotExist() {

    }

    @Test
    void shouldReturnEmptyListWhenPharmacyDoesNotHaveOneOfPrescribedDrugs() {

    }

    @Test
    void shouldReturnOnlyPharmaciesThatHaveAllPrescribedDrugs() {

    }

    @Test
    void shouldReturnAllPharmaciesThatHavePrescribedDrugsSortedByDeliveryTime() {

    }

}

