package com.nexthealth.springbootkeycloak.resolver;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.nexthealth.springbootkeycloak.dto.*;
import com.nexthealth.springbootkeycloak.kafka.producer.OtpEventProducer;
import com.nexthealth.springbootkeycloak.kafkamodel.OtpKafkaEvent;
import com.nexthealth.springbootkeycloak.services.KeycloakServices;
import graphql.kickstart.servlet.context.GraphQLServletContext;
import graphql.kickstart.tools.GraphQLMutationResolver;
import graphql.schema.DataFetchingEnvironment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.annotation.Validated;

import javax.servlet.http.Cookie;
import javax.validation.Valid;


@Component
@Slf4j
@Validated
public class OtpMutationResolver implements GraphQLMutationResolver {

    final KeycloakServices keycloakServices;
    final OtpEventProducer otpEventProducer;
    final String cookieName = "_token";


    @Value("${KEYCLOAK_CLIENT_SECRET}")
    String keycloakClientSecret;
    @Value("${KEYCLOAK_CLIENT_ID}")
    String keycloakClientId;
    @Value("${KEYCLOAK_GRANT_TYPE}")
    String keycloakGrantType;

    public OtpMutationResolver(KeycloakServices keycloakServices, OtpEventProducer otpEventProducer) {
        this.keycloakServices = keycloakServices;
        this.otpEventProducer = otpEventProducer;
    }


    public GenerateOTPOutput generateOTP(@Valid GenerateOTPInput generateOTPInput, DataFetchingEnvironment dataFetchingEnvironment) throws JsonProcessingException {

        GenerateOTPOutput generateOTPOutput = keycloakServices.generateOTPCallToKeycloak(generateOTPInput);
        if (generateOTPOutput.getSuccess() == true) {
            OtpKafkaEvent otpKafkaEvent = otpEventProducer.constructMessage(generateOTPOutput, generateOTPInput);
           // otpEventProducer.sendOtpEvent(otpKafkaEvent);
        }
        return generateOTPOutput;
    }

    public ValidateOTPOutput validateOTP(@Valid ValidateOTPInput validateOTPInput, DataFetchingEnvironment dataFetchingEnvironment) throws JsonProcessingException {

        ValidateOTPOutput validateOTPOutput = keycloakServices.validateOTPCallToKeycloak(populateValidateOtpInput(validateOTPInput));
        if (validateOTPOutput.getSuccess() == true) {
            GraphQLServletContext context = dataFetchingEnvironment.getContext();
            Cookie cookie = new Cookie(cookieName, validateOTPOutput.getJwtToken());
            context.getHttpServletResponse().addCookie(cookie);
        }
        return validateOTPOutput;
    }

    public HttpEntity populateValidateOtpInput(ValidateOTPInput validateOTPInput) {
        MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
        map.add("username", validateOTPInput.getPhoneNumber());
        map.add("grant_type", keycloakGrantType);
        map.add("client_id", keycloakClientId);
        map.add("client_secret", keycloakClientSecret);
        map.add("otp", validateOTPInput.getOtp() + "");

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(map,headers);
        return request;

    }


}
