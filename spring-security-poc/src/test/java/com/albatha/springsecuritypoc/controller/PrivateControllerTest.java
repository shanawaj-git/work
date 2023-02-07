package com.albatha.springsecuritypoc.controller;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PrivateControllerTest {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void shouldRejectRequestAndThrowAnExceptionWhenAccessToEndpointIsNotPermitted() {
        ResponseEntity<String[]> response = restTemplate.getForEntity("http://localhost:" + port + "/api/v1/private/all", String[].class);

        Assertions.assertTrue(response.getStatusCode().is4xxClientError());
    }
}
