package com.albatha.nexthealth.patientsservice.graphql.input;

import lombok.Data;

@Data
public class InsuranceProviderInput {
    String code;
    String eClaimLinkId;
    String name;
}
