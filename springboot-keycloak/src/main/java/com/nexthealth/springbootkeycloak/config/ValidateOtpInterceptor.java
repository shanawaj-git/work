package com.nexthealth.springbootkeycloak.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRequest;
import org.springframework.http.MediaType;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;


import java.io.IOException;
import java.util.Arrays;


public class ValidateOtpInterceptor implements ClientHttpRequestInterceptor {

    @Value("${KEYCLOAK_GENERATE_OTP_URL}")
    String generateEndPoint;
    @Value("${KEYCLOAK_VALIDATE_OTP_URL}")
    String validateEndPoint;
    @Value("${KEYCLOAK_CLIENT_SECRET}")
    String keycloakClientSecret;
    @Value("${KEYCLOAK_CLIENT_ID}")
    String keycloakClientId;
    @Value("${KEYCLOAK_GRANT_TYPE}")
    String keycloakGrantType;

    @Override
    public ClientHttpResponse intercept(HttpRequest httpRequest, byte[] bytes, ClientHttpRequestExecution clientHttpRequestExecution) throws IOException {
        HttpHeaders headers = httpRequest.getHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        return clientHttpRequestExecution.execute(httpRequest, bytes);


    }
}
