package com.albatha.nexthealth.patientsservice.kafka;

import com.albatha.nexthealth.patientsservice.builders.PatientBuilder;
import com.albatha.nexthealth.patientsservice.constants.EventType;
import com.albatha.nexthealth.patientsservice.dto.PatientCreatedEvent;
import com.albatha.nexthealth.patientsservice.dto.PatientDTO;
import com.albatha.nexthealth.patientsservice.model.Patient;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import org.springframework.kafka.support.serializer.JsonSerializer;
import org.springframework.kafka.test.EmbeddedKafkaBroker;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.kafka.test.utils.KafkaTestUtils;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Map;

import static com.albatha.nexthealth.patientsservice.utils.CustomAssertions.shouldBeSame;

@Slf4j
@ExtendWith(SpringExtension.class)
@EmbeddedKafka(topics = "TOPIC_PATIENT")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PatientEventProducerTest {
    private final String TOPIC_PATIENT = "TOPIC_PATIENT";

    private final String CONSUMER_GROUP = "patients-group";

    private final String AUTO_OFFSET_RESET_CONFIG = "earliest";

    private final JsonDeserializer<PatientCreatedEvent> jsonDeserializer = new JsonDeserializer<PatientCreatedEvent>(PatientCreatedEvent.class, false);
    private final JsonSerializer<PatientCreatedEvent> jsonSerializer = new JsonSerializer<PatientCreatedEvent>();

    private final StringDeserializer stringDeserializer = new StringDeserializer();

    private final StringSerializer stringSerializer = new StringSerializer();

    @Autowired
    private EmbeddedKafkaBroker embeddedKafkaBroker;

    private Producer<String, PatientCreatedEvent> eventProducer() {
        Map<String, Object> producerProps = KafkaTestUtils.producerProps(embeddedKafkaBroker.getBrokersAsString());
        log.info("props {}", producerProps);
        return new KafkaProducer<>(producerProps, stringSerializer, jsonSerializer);
    }

    private ConsumerRecords<String, PatientCreatedEvent> consumePatientTopicEvents() {
        Map<String, Object> consumerProps = KafkaTestUtils.consumerProps(CONSUMER_GROUP, "true", embeddedKafkaBroker);
        consumerProps.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, AUTO_OFFSET_RESET_CONFIG);
        ConsumerFactory<String, PatientCreatedEvent> cf = new DefaultKafkaConsumerFactory<>(consumerProps, stringDeserializer, jsonDeserializer);
        Consumer<String, PatientCreatedEvent> consumer = cf.createConsumer();
        embeddedKafkaBroker.consumeFromAnEmbeddedTopic(consumer, TOPIC_PATIENT);
        return KafkaTestUtils.getRecords(consumer);
    }

    @Test
    void shouldCreatePatientAndPublishPatientCreatedEvent() {

        Patient patient = new PatientBuilder().build();
        PatientCreatedEvent event = new PatientCreatedEvent(TOPIC_PATIENT, EventType.NEW_PATIENT.label, new PatientDTO(patient));
        eventProducer().send(new ProducerRecord<>(TOPIC_PATIENT, null, event));

        ConsumerRecords<String, PatientCreatedEvent> consumerRecords = consumePatientTopicEvents();

        Assertions.assertEquals(1, consumerRecords.count());
        consumerRecords.records(TOPIC_PATIENT).forEach(it -> shouldBeSame(event, it.value()));
    }
}
