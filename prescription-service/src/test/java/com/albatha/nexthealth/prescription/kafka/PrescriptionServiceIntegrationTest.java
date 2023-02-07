package com.albatha.nexthealth.prescription.kafka;

import com.albatha.nexthealth.prescription.graphql.model.GraphqlResponse;
import com.albatha.nexthealth.prescription.graphql.model.MutationResponse;
import com.albatha.nexthealth.prescription.graphql.model.PatientMutationResponse;
import com.albatha.nexthealth.prescription.domain.Prescription;
import com.albatha.nexthealth.prescription.dto.PrescriptionEventDTO;
import com.albatha.nexthealth.prescription.repositories.PrescriptionRepository;
import com.albatha.nexthealth.prescription.utils.MockData;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import org.springframework.kafka.support.serializer.JsonSerializer;
import org.springframework.kafka.test.EmbeddedKafkaBroker;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.kafka.test.utils.KafkaTestUtils;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertEquals;

@Slf4j
@ExtendWith(SpringExtension.class)
@EmbeddedKafka(topics = "TOPIC_PRESCRIPTION")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PrescriptionServiceIntegrationTest {
    private final String TOPIC_PRESCRIPTION = "TOPIC_PRESCRIPTION";
    private final String TOPIC = "prescriptions";
    private final String CONSUMER_GROUP = "prescriptions-group";
    private final String AUTO_OFFSET_RESET_CONFIG = "earliest";
    @Autowired
    PrescriptionRepository prescriptionRepository;
    @Autowired
    private EmbeddedKafkaBroker embeddedKafkaBroker;
    @Autowired
    private MockData mockData;

    @Autowired
    ObjectMapper customObjectMapper;

    MockWebServer server = new MockWebServer();

    private final JsonDeserializer<PrescriptionEventDTO> jsonDeserializer = new JsonDeserializer<PrescriptionEventDTO>(PrescriptionEventDTO.class, false);
    private final JsonSerializer<PrescriptionEventDTO> jsonSerializer = new JsonSerializer<PrescriptionEventDTO>();

    private final StringDeserializer stringDeserializer = new StringDeserializer();

    private final StringSerializer stringSerializer = new StringSerializer();

    private Consumer<String, PrescriptionEventDTO> eventConsumer() {
        Map<String, Object> consumerProps = KafkaTestUtils.consumerProps(CONSUMER_GROUP, "false", embeddedKafkaBroker);
        consumerProps.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, AUTO_OFFSET_RESET_CONFIG);

        ConsumerFactory<String, PrescriptionEventDTO> cf = new DefaultKafkaConsumerFactory<>(consumerProps, stringDeserializer, jsonDeserializer);
        return cf.createConsumer();
    }

    private Producer<String, PrescriptionEventDTO> eventProducer() {
        Map<String, Object> producerProps = KafkaTestUtils.producerProps(embeddedKafkaBroker.getBrokersAsString());
        log.info("props {}", producerProps);
        return new KafkaProducer(producerProps, stringSerializer, jsonSerializer);
    }

    void mockCreatePatient(GraphqlResponse response) throws IOException {
        MockResponse mockResponse = new MockResponse();
        mockResponse.addHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        mockResponse.setBody(customObjectMapper.writeValueAsString(response));
        server.enqueue(mockResponse);
        server.start(3434);
    }

    @BeforeEach
    void init() throws IOException {
        server.shutdown();
    }

    @AfterEach
    void reset() throws IOException {
        server.shutdown();
    }

    @Test
    void shouldConsumePrescriptionEventAndCreatePrescription() throws InterruptedException, IOException {
        GraphqlResponse<PatientMutationResponse> expectedResponse = new GraphqlResponse<PatientMutationResponse>(
            new ArrayList[]{},
            new PatientMutationResponse(
                new MutationResponse(true, null, null)
            )
        );
        mockCreatePatient(expectedResponse);

        PrescriptionEventDTO prescriptionEventDTO = mockData.mockPrescriptionDTO();
        embeddedKafkaBroker.consumeFromAnEmbeddedTopic(eventConsumer(), TOPIC_PRESCRIPTION);

        String prescriptionNumber = prescriptionEventDTO.getData().getPrescriptionNumber();
        eventProducer().send(new ProducerRecord(TOPIC, null, prescriptionEventDTO));

        TimeUnit.SECONDS.sleep(1);
        Prescription prescription = prescriptionRepository.findByPrescriptionNumber(prescriptionNumber);
        assertEquals(prescription.getPrescriptionNumber(), prescriptionNumber);
    }

    @Test
    void shouldConsumePrescriptionEventAndNotCreatePrescriptionWhenAnErrorOccursInAnyStep() throws IOException, InterruptedException {
        GraphqlResponse<PatientMutationResponse> expectedResponse = new GraphqlResponse<PatientMutationResponse>(
            new ArrayList[]{},
            new PatientMutationResponse(
                new MutationResponse(false, null, null)
            )
        );
        mockCreatePatient(expectedResponse);

        PrescriptionEventDTO prescriptionEventDTO = mockData.mockPrescriptionDTO();
        embeddedKafkaBroker.consumeFromAnEmbeddedTopic(eventConsumer(), TOPIC_PRESCRIPTION);

        String prescriptionNumber = prescriptionEventDTO.getData().getPrescriptionNumber();
        eventProducer().send(new ProducerRecord(TOPIC, null, prescriptionEventDTO));

        TimeUnit.SECONDS.sleep(1);
        Prescription response = prescriptionRepository.findByPrescriptionNumber(prescriptionNumber);
        Assertions.assertNull(response);
    }
}
