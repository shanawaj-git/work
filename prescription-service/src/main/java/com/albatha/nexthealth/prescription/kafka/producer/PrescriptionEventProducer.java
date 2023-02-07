package com.albatha.nexthealth.prescription.kafka.producer;

import com.albatha.nexthealth.prescription.constants.Topic;
import com.albatha.nexthealth.prescription.dto.PrescriptionEventDTO;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;

@Component
@Slf4j
public class PrescriptionEventProducer {
    final String TOPIC = Topic.PRESCRIPTIONS.name;
    @Autowired
    private KafkaTemplate<String, PrescriptionEventDTO> kafkaTemplate;

    public void sendPrescriptionEvent(PrescriptionEventDTO prescriptionEventDTO) {
        ProducerRecord<String, PrescriptionEventDTO> producerRecord = buildProducerRecord("", prescriptionEventDTO, TOPIC);
        ListenableFuture<SendResult<String, PrescriptionEventDTO>> listenableFuture = kafkaTemplate.send(producerRecord);
        listenableFuture.addCallback(new ListenableFutureCallback<SendResult<String, PrescriptionEventDTO>>() {
            @Override
            public void onFailure(Throwable ex) {
                handleFailure("", ex);
            }

            @Override
            public void onSuccess(SendResult<String, PrescriptionEventDTO> result) {
                handleSuccess("", result);
            }
        });
    }

    private ProducerRecord<String, PrescriptionEventDTO> buildProducerRecord(String key, PrescriptionEventDTO prescriptionEventDTO, String topic) {

        return new ProducerRecord<String, PrescriptionEventDTO>(topic, key, prescriptionEventDTO);
    }

    private void handleFailure(String key, Throwable ex) {
        log.error("Error Sending the Message and the exception is {}", ex.getMessage());

    }

    private void handleSuccess(String key, SendResult<String, PrescriptionEventDTO> result) {
        log.info("Message Sent SuccessFully for the key : {} and the value is {} , partition is {}", key, result, result.getRecordMetadata().partition());
    }

}
