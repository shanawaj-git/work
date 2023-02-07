package com.albatha.nexthealth.pharmacies.kafka.consumer;

import com.albatha.nexthealth.pharmacies.model.Event;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@ConditionalOnProperty(value = "spring.kafka.enabled", havingValue = "true", matchIfMissing = true)
public class EventConsumer {

    // This is a sample of generic consumer for kafka that can be used if consumer is needed
    @KafkaListener(topics = {"pharmacies"})
    public void onMessage(Event<?> event) {
        log.info("Consuming event : {} ", event);
    }
}