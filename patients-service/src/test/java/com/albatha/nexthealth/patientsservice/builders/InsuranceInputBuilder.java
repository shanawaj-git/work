package com.albatha.nexthealth.patientsservice.builders;

import com.albatha.nexthealth.patientsservice.defaultData.DefaultInsuranceData;
import com.albatha.nexthealth.patientsservice.graphql.input.InsuranceInput;
import com.albatha.nexthealth.patientsservice.graphql.input.InsuranceProviderInput;

import java.time.OffsetDateTime;
import java.util.UUID;

public class InsuranceInputBuilder {

    public UUID insuranceId = DefaultInsuranceData.ID;
    public String insId = DefaultInsuranceData.INS_ID;
    public String policyNumber = DefaultInsuranceData.POLICY_NUMBER;
    public String network = DefaultInsuranceData.NETWORK;
    public OffsetDateTime expiryDate = DefaultInsuranceData.EXPIRY_DATE_OFFSET;
    public InsuranceProviderInput provider = null;


    public InsuranceInput build() {
        return new InsuranceInput(
                insId, policyNumber, network, expiryDate, provider
        );
    }
}
