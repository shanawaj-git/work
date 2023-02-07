package com.albatha.nexthealth.patientsservice.graphql.input;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
@AllArgsConstructor
public class InsuranceInput {

    private String insId;
    private String policyNumber;
    private String network;
    private OffsetDateTime expiryDate;
    private InsuranceProviderInput provider;
}
