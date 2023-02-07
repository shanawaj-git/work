package com.nexthealth.springbootkeycloak.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nexthealth.springbootkeycloak.dto.ErrorResponseDTO;
import com.nexthealth.springbootkeycloak.dto.JwtTokenDTO;
import com.nexthealth.springbootkeycloak.dto.OtpError;
import com.nexthealth.springbootkeycloak.dto.ValidateOTPOutput;
import com.nexthealth.springbootkeycloak.exception.ValidateOtpExceptionHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.HttpClientErrorException;

import java.io.IOException;
import java.util.Arrays;

@Slf4j
public class Interceptor implements ClientHttpRequestInterceptor {

    @Autowired
    ObjectMapper objectMapper;

    @Override
    public ClientHttpResponse intercept(HttpRequest httpRequest, byte[] bytes, ClientHttpRequestExecution clientHttpRequestExecution) throws IOException {
        HttpHeaders headers = httpRequest.getHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        try {
            return clientHttpRequestExecution.execute(httpRequest, bytes);
        }catch(HttpClientErrorException ex )
        {
            ex.printStackTrace();
            log.info("getMessage" + ex.getMessage());
            String errorJson = ex.getResponseBodyAsString();
            log.info("errorJson" + errorJson);
            ErrorResponseDTO errorResponseDTO = objectMapper.readValue(errorJson, ErrorResponseDTO.class);
            log.info("errorResponseDTO" + errorResponseDTO.toString());
            return new ValidateOtpExceptionHandler().constructErrorResponse(errorResponseDTO, null);
        }
    }

}
