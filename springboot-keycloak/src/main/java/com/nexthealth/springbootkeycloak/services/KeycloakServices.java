package com.nexthealth.springbootkeycloak.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nexthealth.springbootkeycloak.dto.*;
import com.nexthealth.springbootkeycloak.kafka.producer.OtpEventProducer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Component
@Slf4j
public class KeycloakServices {


    final OtpEventProducer otpEventProducer;
    final ObjectMapper objectMapper;
    final String INVALID_GRAND_ERROR = "AUTH_ERR_101";
    private final RestTemplate restTemplate;
    @Value("${KEYCLOAK_GENERATE_OTP_URL}")
    String generateEndPoint;
    @Value("${KEYCLOAK_VALIDATE_OTP_URL}")
    String validateEndPoint;

    public KeycloakServices(OtpEventProducer otpEventProducer, ObjectMapper objectMapper, RestTemplate restTemplate) {
        this.otpEventProducer = otpEventProducer;
        this.objectMapper = objectMapper;
        this.restTemplate = restTemplate;
    }

    public GenerateOTPOutput generateOTPCallToKeycloak(GenerateOTPInput generateOTPInput) {
        HttpEntity<GenerateOTPInput> entity = new HttpEntity<GenerateOTPInput>(generateOTPInput);
        ResponseEntity<GenerateOTPOutput> response = restTemplate.exchange(generateEndPoint, HttpMethod.POST, entity, GenerateOTPOutput.class);
        log.info("responce {}", response.getBody());
        return response.getBody();
    }

    public ValidateOTPOutput validateOTPCallToKeycloak(HttpEntity requestMap) throws JsonProcessingException {
        try {
            ResponseEntity<JwtTokenDTO> jwtTokemDto = restTemplate.postForEntity(validateEndPoint, requestMap, JwtTokenDTO.class);
            return new ValidateOTPOutput(true, null, jwtTokemDto.getBody().getAccess_token());
        } catch (HttpClientErrorException ex) {
            ex.printStackTrace();
            log.info("getMessage" + ex.getMessage());
            String errorJson = ex.getResponseBodyAsString();
            log.info("errorJson" + errorJson);
            ErrorResponseDTO errorResponseDTO = objectMapper.readValue(errorJson, ErrorResponseDTO.class);
            log.info("errorResponseDTO" + errorResponseDTO.toString());
            return constructErrorResponse(errorResponseDTO, null);
        }
    }

    public ValidateOTPOutput constructErrorResponse(ErrorResponseDTO errorResponseDTO, JwtTokenDTO jwtTokenDTO) {
        ValidateOTPOutput validateOTPOutput = new ValidateOTPOutput();
        if (errorResponseDTO != null) {
            OtpError otpError = new OtpError();
            if (errorResponseDTO.getError_code() == null) {
                otpError.setCode(INVALID_GRAND_ERROR);
            } else {
                otpError.setCode(errorResponseDTO.getError_code());
            }
            otpError.setMessage(errorResponseDTO.getError_description());
            otpError.setResendWaitPeriodMillis(errorResponseDTO.getResend_wait_period_millis());

            validateOTPOutput.setSuccess(false);
            validateOTPOutput.setError(otpError);
        }
        return validateOTPOutput;
    }

}
