package com.albatha.nexthealth.pharmacies.kafka.consumer;

import static com.albatha.nexthealth.pharmacies.kafka.consumer.Constants.DOMAIN_EVENT_TOPIC_PRESCRIPTIONS;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.kafka.support.serializer.JsonSerializer;
import org.springframework.kafka.test.EmbeddedKafkaBroker;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.kafka.test.utils.KafkaTestUtils;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;

import com.albatha.nexthealth.domain.Event;
import com.albatha.nexthealth.domain.prescriptions.EventType;
import com.albatha.nexthealth.domain.prescriptions.dto.PrescriptionDTO;
import com.albatha.nexthealth.pharmacies.services.PrescriptionService;

@EmbeddedKafka(partitions = 1)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@TestInstance(Lifecycle.PER_CLASS)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class PrescriptionsEventConsumerTests {

	@SpyBean
	private PrescriptionService prescriptionService;

	@Autowired
	private EmbeddedKafkaBroker embeddedKafkaBroker;

	private final StringSerializer stringSerializer = new StringSerializer();
	private final JsonSerializer<Event<Object>> jsonSerializer = new JsonSerializer<Event<Object>>();

	private Producer<String, Event<Object>> eventProducer() {
		Map<String, Object> producerProps = KafkaTestUtils.producerProps(embeddedKafkaBroker.getBrokersAsString());
		return new KafkaProducer<String, Event<Object>>(producerProps, stringSerializer, jsonSerializer);
	}

	@Test
	void shouldIngestWhenPrescriptionReceivedEventHappened() throws InterruptedException {
		String prscriptionNumer = "123-456-789";
		PrescriptionDTO prescriptionDTO = new PrescriptionDTO();
		prescriptionDTO.setPrescriptionNumber(prscriptionNumer);

		Event<Object> event = new Event<Object>(DOMAIN_EVENT_TOPIC_PRESCRIPTIONS, EventType.RECEIVED_PRESCRIPTION.label, prescriptionDTO);

		eventProducer().send(new ProducerRecord<String, Event<Object>>(DOMAIN_EVENT_TOPIC_PRESCRIPTIONS, null, event));

		TimeUnit.SECONDS.sleep(1L);

		ArgumentCaptor<PrescriptionDTO> prescriptionDTOCaptor = ArgumentCaptor.forClass(PrescriptionDTO.class);

		verify(prescriptionService, atLeastOnce()).ingestPrescription(prescriptionDTOCaptor.capture());

		assertEquals(prescriptionDTO.getPrescriptionNumber(), prescriptionDTOCaptor.getValue().getPrescriptionNumber());

	}

	@Test
	void shouldNotIngestWhenNonPrescriptionReceivedEventHappened() throws InterruptedException {
		String prscriptionNumer = "123-456-789";
		PrescriptionDTO prescriptionDTO = new PrescriptionDTO();
		prescriptionDTO.setPrescriptionNumber(prscriptionNumer);

		Event<Object> event = new Event<Object>(DOMAIN_EVENT_TOPIC_PRESCRIPTIONS, EventType.NEW_PRESCRIPTION.label, prescriptionDTO);

		eventProducer().send(new ProducerRecord<String, Event<Object>>(DOMAIN_EVENT_TOPIC_PRESCRIPTIONS, null, event));

		TimeUnit.SECONDS.sleep(1L);

		verify(prescriptionService, never()).ingestPrescription(any());
	}
}