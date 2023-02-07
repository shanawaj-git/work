package com.albatha.nexthealth.prescription.repositories;

import com.albatha.nexthealth.prescription.builders.InsuranceBuilder;
import com.albatha.nexthealth.prescription.domain.Insurance;
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
class InsuranceRepositoryTest {

    @Autowired
    private InsuranceRepository insuranceRepository;

    @BeforeEach
    void clean() {
        insuranceRepository.deleteAll();
    }

    @Test
    void shouldReturnNullWhenNoInsuranceExistForGivenIsnId() {
        String randomIsnId = "ISN-5353";
        Insurance insurance = new InsuranceBuilder().build();

        insuranceRepository.save(insurance);

        Insurance response = insuranceRepository.findInsuranceByInsId(randomIsnId);
        Assertions.assertNull(response);
    }

    @Test
    void shouldReturnInsuranceForGivenIsnId() {
        Insurance careInsurance = new InsuranceBuilder()
                .network("Care Insurance")
                .insId("ISN-93438")
                .build();
        Insurance primeInsurance = new InsuranceBuilder()
                .network("Prime Insurance")
                .insId("ISN-256421")
                .build();

        insuranceRepository.saveAll(List.of(careInsurance, primeInsurance));

        Insurance response = insuranceRepository.findInsuranceByInsId(careInsurance.getInsId());
        shouldBeSame(careInsurance, response);
    }
}
