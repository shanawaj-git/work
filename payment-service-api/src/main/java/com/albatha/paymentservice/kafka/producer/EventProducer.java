package com.albatha.paymentservice.kafka.producer;

import com.albatha.paymentservice.domain.Event;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;

import javax.validation.constraints.NotNull;

@Component
@Slf4j
@ConditionalOnProperty(value = "spring.kafka.enabled", havingValue = "true", matchIfMissing = true)
public class EventProducer {

    private final KafkaTemplate<String, Event<?>> kafkaTemplate;

    public EventProducer(KafkaTemplate<String, Event<?>> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void produce(Event<?> event) {
        ProducerRecord<String, Event<?>> producerRecord = buildProducerRecord(null, event, event.getTopic());
        ListenableFuture<SendResult<String, Event<?>>> listenableFuture = kafkaTemplate.send(producerRecord);
        addCallbacks(listenableFuture);
    }

    private void addCallbacks(ListenableFuture<SendResult<String, Event<?>>> listenableFuture) {
        listenableFuture.addCallback(new ListenableFutureCallback<>() {
            @Override
            public void onFailure(@NotNull Throwable ex) {
                handleFailure(ex);
            }

            @Override
            public void onSuccess(SendResult<String, Event<?>> result) {
                handleSuccess(null, result);
            }
        });
    }

    private ProducerRecord<String, Event<?>> buildProducerRecord(String key, Event<?> event, String topic) {
        return new ProducerRecord<>(topic, key, event);
    }

    private void handleFailure(Throwable ex) {
        log.error("Error Sending event {}", ex.getMessage());
    }

    private void handleSuccess(String key, SendResult<String, Event<?>> result) {
        String eventType = result.getProducerRecord().value().getEventType();
        Integer partition = result.getProducerRecord().partition();
        log.info("{} Sent SuccessFully for the key : {} and the value is {} , partition is {}", eventType, key, result, partition);
    }
}
