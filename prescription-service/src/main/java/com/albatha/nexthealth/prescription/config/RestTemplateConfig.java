package com.albatha.nexthealth.prescription.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

@Configuration
public class RestTemplateConfig {

    @Value("${client-connect-timeout}") Duration clientConnectTimout;
    @Value("${client-read-timeout}") Duration clientReadTimout;

    @Bean
    public RestTemplate webTemplate() {
        return new RestTemplateBuilder()
            .setConnectTimeout(clientConnectTimout)
            .setReadTimeout(clientReadTimout)
            .build();
    }
}
