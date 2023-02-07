package com.nexthealth.springbootkeycloak.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nexthealth.springbootkeycloak.dto.ErrorResponseDTO;
import com.nexthealth.springbootkeycloak.dto.JwtTokenDTO;
import com.nexthealth.springbootkeycloak.dto.OtpError;
import com.nexthealth.springbootkeycloak.dto.ValidateOTPOutput;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.client.DefaultResponseErrorHandler;

import java.io.IOException;

@Component
@Slf4j
public class ValidateOtpExceptionHandler extends DefaultResponseErrorHandler {

    @Autowired
    ObjectMapper objectMapper;
    final String INVALID_GRAND_ERROR = "AUTH_ERR_101";

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
