package com.${{values.java_package_name}}.${{values.component_id}};

import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.kafka.test.EmbeddedKafkaBroker;
import org.junit.jupiter.api.Test;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.test.annotation.DirtiesContext;

@EmbeddedKafka
@DirtiesContext
@DataMongoTest
class ApplicationTests {
	@Autowired
	private ReactiveMongoTemplate reactiveMongoTemplate;

	@Autowired
	private EmbeddedKafkaBroker embeddedKafkaBroker;

	@Test
	void contextLoads() {
		Assertions.assertNotNull(reactiveMongoTemplate);
		Assertions.assertNotNull(embeddedKafkaBroker);
	}

}
