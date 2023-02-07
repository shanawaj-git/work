package com.albatha.nexthealth.patientsservice.config;

import com.albatha.nexthealth.patientsservice.dto.PatientCreatedEvent;
import com.asyncapi.v2.binding.kafka.KafkaOperationBinding;
import com.asyncapi.v2.model.info.Info;
import com.asyncapi.v2.model.server.Server;
import graphql.com.google.common.collect.ImmutableMap;
import io.github.stavshamir.springwolf.asyncapi.types.ProducerData;
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

    private final String BOOTSTRAP_SERVERS;
    private static final String TITLE="Patient Service";
    private static final String CHANNEL="patients";
    private static final String BASE_PACKAGE="com.albatha.nexthealth.patientsservice.kafka.producer";
    private static final String KAFKA="kafka";
    private static final String VERSION="0.3.0";

    public AsyncApiConfiguration(@Value("${KAFKA_BOOTSTRAP_SERVER}") String bootstrapServers) {
        this.BOOTSTRAP_SERVERS = bootstrapServers;
    }

    @Bean
    public AsyncApiDocket asyncApiDocket() {
        Info info = Info.builder()
                .version(VERSION)
                .title(TITLE)
                .build();

        ProducerData producerData = ProducerData.builder()
                .channelName(CHANNEL)
                .binding(ImmutableMap.of(KAFKA, new KafkaOperationBinding()))
                .payloadType(PatientCreatedEvent.class)
                .build();

         return AsyncApiDocket.builder()
                .basePackage(BASE_PACKAGE)
                .info(info)
                .server(KAFKA, Server.builder().protocol(KAFKA).url(BOOTSTRAP_SERVERS).build())
                .producer(producerData)
                .build();
    }

}
