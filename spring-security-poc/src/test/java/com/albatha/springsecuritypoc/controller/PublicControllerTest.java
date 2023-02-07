package com.albatha.springsecuritypoc.controller;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PublicControllerTest {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void shouldReturnListOfStringWhenAccessToEndpointIsPermittedForAll() {
        String[] response = restTemplate.getForObject("http://localhost:" + port + "/api/v1/public/all", String[].class);
        Assertions.assertEquals(1, response.length);
    }

}
