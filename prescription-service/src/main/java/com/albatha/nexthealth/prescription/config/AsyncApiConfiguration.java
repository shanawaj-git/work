package com.albatha.nexthealth.prescription.config;

import com.albatha.nexthealth.prescription.dto.PrescriptionEventDTO;
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
    private final String TITLE="Prescription Service";

    public AsyncApiConfiguration(@Value("${KAFKA_BOOTSTRAP_SERVER}") String bootstrapServers) {
        this.BOOTSTRAP_SERVERS = bootstrapServers;
    }

    @Bean
    public AsyncApiDocket asyncApiDocket() {
        Info info = Info.builder()
                .version("0.3.0")
                .title(TITLE)
                .build();

        ProducerData exampleProducerData = ProducerData.builder()
                .channelName("prescription")
                .binding(ImmutableMap.of("kafka", new KafkaOperationBinding()))
                .payloadType(PrescriptionEventDTO.class)
                .build();

         return AsyncApiDocket.builder()
                .basePackage("com.albatha.nexthealth.prescription.kafka.consumer")
                .info(info)
                .server("kafka", Server.builder().protocol("kafka").url(BOOTSTRAP_SERVERS).build())
                .producer(exampleProducerData)
                .build();
    }

}
