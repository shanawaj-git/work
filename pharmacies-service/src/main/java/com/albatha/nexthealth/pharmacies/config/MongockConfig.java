package com.albatha.nexthealth.pharmacies.config;

import com.mongodb.reactivestreams.client.MongoClient;
import io.mongock.driver.mongodb.reactive.driver.MongoReactiveDriver;
import io.mongock.runner.springboot.base.MongockInitializingBeanRunner;
import io.mongock.runner.springboot.base.config.MongockSpringConfiguration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.mongock.runner.springboot.MongockSpringboot;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("!test")
public class MongockConfig extends MongockSpringConfiguration {
    @Bean
    MongockInitializingBeanRunner mongockApplicationRunner(
        ApplicationContext springContext,
        MongoClient mongoClient,
        @Value("${spring.data.mongodb.database}") String database
    ) {

        return MongockSpringboot.builder()
            .setDriver(MongoReactiveDriver.withDefaultLock(mongoClient, database))
            .addMigrationScanPackage("com.albatha.nexthealth.pharmacies.migration")
            .setSpringContext(springContext)
            .setTransactionEnabled(true)
            .buildInitializingBeanRunner();
    }
}
