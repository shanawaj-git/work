package com.albatha.nexthealth.prescription.builders;

import com.albatha.nexthealth.prescription.defaultData.DefaultInsuranceData;
import com.albatha.nexthealth.prescription.domain.Insurance;
import com.albatha.nexthealth.prescription.domain.InsuranceProvider;

import java.sql.Timestamp;

public class InsuranceBuilder {
    public Long insuranceId = DefaultInsuranceData.ID;
    public String insId = DefaultInsuranceData.INS_ID;
    public String policyNumber = DefaultInsuranceData.POLICY_NUMBER;
    public String network = DefaultInsuranceData.NETWORK;
    public Timestamp expiryDate = DefaultInsuranceData.EXPIRY_DATE;
    public InsuranceProvider provider = DefaultInsuranceData.PROVIDER;
    public Timestamp createdDate = DefaultInsuranceData.CREATED_DATE;

    public InsuranceBuilder network(String network) {
        this.network = network;
        return this;
    }

    public InsuranceBuilder insId(String insId) {
        this.insId = insId;
        return this;
    }

    public Insurance build() {
        return new Insurance(
            insuranceId,
            insId,
            policyNumber,
            network,
            expiryDate,
            provider,
            createdDate
        );
    }
}
