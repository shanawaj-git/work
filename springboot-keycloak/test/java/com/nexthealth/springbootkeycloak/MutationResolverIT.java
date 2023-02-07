package com.nexthealth.springbootkeycloak;

import com.graphql.spring.boot.test.GraphQLTest;
import com.graphql.spring.boot.test.GraphQLTestTemplate;
import com.nexthealth.springbootkeycloak.SpringbootKeycloakApplication;
import com.nexthealth.springbootkeycloak.dto.ErrorResponseDTO;
import com.nexthealth.springbootkeycloak.dto.GenerateOTPInput;
import com.nexthealth.springbootkeycloak.dto.GenerateOTPOutput;
import com.nexthealth.springbootkeycloak.dto.OtpError;
import com.nexthealth.springbootkeycloak.kafka.producer.OtpEventProducer;
import com.nexthealth.springbootkeycloak.services.KeycloakServices;
import org.json.JSONException;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;

import java.io.IOException;

import static java.lang.String.format;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
import static org.skyscreamer.jsonassert.JSONAssert.assertEquals;


@GraphQLTest
class MutationResolverIT {

    private static final String GRAPHQL_QUERY_REQUEST_PATH = "%s.graphql";
    @Autowired
    GraphQLTestTemplate graphQLTestTemplate;
    @MockBean
    KeycloakServices externalCalls;

    @MockBean
    OtpEventProducer otpEventProducer;

    @Test
    void generateOTP() throws JSONException, IOException {
        GenerateOTPOutput generateOTPOutput = new GenerateOTPOutput();
        OtpError otpError = new OtpError();
        generateOTPOutput.setSuccess(true);
        otpError.setCode("");
        generateOTPOutput.setOtpError(otpError);
        GenerateOTPInput generateOTPInput = new GenerateOTPInput();
        generateOTPInput.setPhoneNumber("1212121");

        var testName = "mutation";
        when(externalCalls.generateOTPCallToKeycloak(generateOTPInput)).thenReturn((generateOTPOutput));

        var graphQLResponse = graphQLTestTemplate.postForResource(format(GRAPHQL_QUERY_REQUEST_PATH, testName));
        assertThat(graphQLResponse.getStatusCode()).isEqualTo(HttpStatus.OK);

    }

}

