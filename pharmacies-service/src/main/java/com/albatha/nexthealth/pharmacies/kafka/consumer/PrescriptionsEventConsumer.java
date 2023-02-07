package com.albatha.nexthealth.pharmacies.kafka.consumer;

import static com.albatha.nexthealth.pharmacies.kafka.consumer.Constants.DOMAIN_EVENT_TOPIC_PRESCRIPTIONS;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.albatha.nexthealth.domain.Event;
import com.albatha.nexthealth.domain.prescriptions.EventType;
import com.albatha.nexthealth.domain.prescriptions.dto.PrescriptionDTO;
import com.albatha.nexthealth.pharmacies.services.PrescriptionService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class PrescriptionsEventConsumer {

	private final PrescriptionService prescriptionService;

	public PrescriptionsEventConsumer(PrescriptionService prescriptionService) {
		this.prescriptionService = prescriptionService;
	}

	@KafkaListener(topics = { DOMAIN_EVENT_TOPIC_PRESCRIPTIONS })
	public void listen(Event<Object> event) {
		if (EventType.RECEIVED_PRESCRIPTION.label.equals(event.getEventType())) {
			log.info("Consuming event : {} ", event);
			PrescriptionDTO prescriptionDTO = new ObjectMapper().convertValue(event.getData(), PrescriptionDTO.class);
			prescriptionService.ingestPrescription(prescriptionDTO);
		}
	}
}