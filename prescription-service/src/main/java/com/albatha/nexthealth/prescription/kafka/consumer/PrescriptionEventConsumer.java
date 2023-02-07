package com.albatha.nexthealth.prescription.kafka.consumer;

import com.albatha.nexthealth.prescription.constants.EventType;
import com.albatha.nexthealth.prescription.domain.Prescription;
import com.albatha.nexthealth.prescription.dto.PrescriptionDTO;
import com.albatha.nexthealth.prescription.dto.PrescriptionEventDTO;
import com.albatha.nexthealth.prescription.exception.PatientCreationException;
import com.albatha.nexthealth.prescription.kafka.producer.PrescriptionEventProducer;
import com.albatha.nexthealth.prescription.service.impl.PrescriptionServiceImpl;
import com.albatha.nexthealth.prescription.transformer.PrescriptionMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import java.io.IOException;

@Component
@Slf4j
public class PrescriptionEventConsumer {

    final PrescriptionMapper prescriptionMapper;
    final PrescriptionServiceImpl prescriptionService;
    final PrescriptionEventProducer prescriptionEventProducer;

    public PrescriptionEventConsumer(PrescriptionMapper prescriptionMapper, PrescriptionServiceImpl prescriptionService, PrescriptionEventProducer prescriptionEventProducer) {
        this.prescriptionMapper = prescriptionMapper;
        this.prescriptionService = prescriptionService;
        this.prescriptionEventProducer = prescriptionEventProducer;
    }

    @KafkaListener(topics = {"prescriptions"})
    public void onMessage(PrescriptionEventDTO prescriptionEventDTO) throws PatientCreationException, IOException {

        log.info("ConsumerRecord : {} ", prescriptionEventDTO);
        if(prescriptionEventDTO.eventType.equals(EventType.NEW_PRESCRIPTION.name)) {
            PrescriptionDTO prescriptionDTO = prescriptionEventDTO.getData();
            Prescription prescription = prescriptionMapper.convertPrescriptionDTOToEntity(prescriptionDTO);
            prescriptionService.persistPrescription(prescription);
            prescriptionEventDTO.eventType= EventType.RECEIVED_PRESCRIPTION.name;
            prescriptionEventProducer.sendPrescriptionEvent(prescriptionEventDTO);
        }

    }
}