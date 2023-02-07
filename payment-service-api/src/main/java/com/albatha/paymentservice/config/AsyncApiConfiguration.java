package com.albatha.paymentservice.config;

import com.albatha.paymentservice.dto.PaymentMethodCreatedEvent;
import com.asyncapi.v2.model.info.Info;
import com.asyncapi.v2.model.server.Server;
import io.github.stavshamir.springwolf.asyncapi.types.KafkaProducerData;
import io.github.stavshamir.springwolf.configuration.AsyncApiDocket;
import io.github.stavshamir.springwolf.configuration.EnableAsyncApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;


@Profile("!prod")
@Configuration
@EnableAsyncApi
public class AsyncApiConfiguration {
    private static final String TITLE = "Payment Service API";
    private static final String CHANNEL = "payment";
    private static final String BASE_PACKAGE = "com.albatha.paymentservice.kafka.producer";
    private static final String KAFKA = "kafka";
    private static final String VERSION = "0.3.0";
    private final String BOOTSTRAP_SERVERS ;

    public AsyncApiConfiguration(@Value("${KAFKA_BOOTSTRAP_SERVER:kafka:9092}") String bootstrapServers) {
        this.BOOTSTRAP_SERVERS = bootstrapServers;
    }
    @Bean
    public AsyncApiDocket asyncApiDocket() {
        Info info = Info.builder()
                .version(VERSION)
                .title(TITLE)
                .build();

        KafkaProducerData producerData = KafkaProducerData.kafkaProducerDataBuilder()
                .topicName(CHANNEL)
                .payloadType(PaymentMethodCreatedEvent.class)
                .build();

        return AsyncApiDocket.builder()
                .basePackage(BASE_PACKAGE)
                .info(info)
                .server(KAFKA, Server.builder().protocol(KAFKA).url(BOOTSTRAP_SERVERS).build())
                .producer(producerData)
                .build();
    }
}
