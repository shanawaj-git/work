package com.albatha.nexthealth.prescription.repositories;

import com.albatha.nexthealth.prescription.builders.DoctorBuilder;
import com.albatha.nexthealth.prescription.defaultData.DefaultDoctorData;
import com.albatha.nexthealth.prescription.domain.Doctor;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.test.annotation.DirtiesContext;

@EmbeddedKafka
@DirtiesContext
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class DoctorRepositoryTest {
    @Autowired
    private DoctorRepository doctorRepository;

    @BeforeEach
    void clean() {
        doctorRepository.deleteAll();
    }

    @Test
    void shouldSaveADoctor() {
        Doctor doctor = new DoctorBuilder().build();
        doctorRepository.save(doctor);

        Doctor response = doctorRepository.getDoctorByDocId(doctor.getDocId());
        Assertions.assertEquals(DefaultDoctorData.EMAIL, response.getEmail());
    }
}