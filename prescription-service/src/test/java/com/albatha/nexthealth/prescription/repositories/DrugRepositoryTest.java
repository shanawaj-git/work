package com.albatha.nexthealth.prescription.repositories;

import com.albatha.nexthealth.prescription.builders.DrugBuilder;
import com.albatha.nexthealth.prescription.domain.Drug;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
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
class DrugRepositoryTest {
    @Autowired
    private DrugRepository drugRepository;

    @BeforeEach
    void clean() {
        drugRepository.deleteAll();
    }

    // Test Save Drug query
    @Test
    void shouldSaveDrug() {

        Drug drug = new DrugBuilder().build();
        drugRepository.save(drug);

        Drug response = drugRepository.getDrugByCode(drug.getCode());
        shouldBeSame(drug, response);
    }

    // Test find drug by code
    @Test
    void shouldReturnDrugForGivenCode() {
        String DAECode = "DAE-642";
        String UHBCode = "UHB-231";
        Drug drugWithDAECode = new DrugBuilder().code(DAECode).build();
        Drug drugWithUHBCode = new DrugBuilder().code(UHBCode).build();

        drugRepository.saveAll(List.of(drugWithUHBCode, drugWithDAECode));

        Drug response = drugRepository.getDrugByCode(DAECode);
        shouldBeSame(drugWithDAECode, response);
    }

    @Test
    void shouldReturnNullWhenDrugDoesNotExistForGivenCode() {
        String DAECode = "DAE-642";
        String UHBCode = "UHB-231";
        Drug drugWithDAECode = new DrugBuilder().code(DAECode).build();

        drugRepository.save(drugWithDAECode);

        Drug response = drugRepository.getDrugByCode(UHBCode);
        Assertions.assertNull(response);
    }
}