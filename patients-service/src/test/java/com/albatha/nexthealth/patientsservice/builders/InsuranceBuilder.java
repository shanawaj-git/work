package com.albatha.nexthealth.patientsservice.builders;

import com.albatha.nexthealth.patientsservice.defaultData.DefaultInsuranceData;
import com.albatha.nexthealth.patientsservice.model.Insurance;
import com.albatha.nexthealth.patientsservice.model.InsuranceProvider;
import java.sql.Timestamp;
import java.util.UUID;

public class InsuranceBuilder {
    public UUID insuranceId = DefaultInsuranceData.ID;
    public String insId = DefaultInsuranceData.INS_ID;
    public String policyNumber = DefaultInsuranceData.POLICY_NUMBER;
    public String network = DefaultInsuranceData.NETWORK;
    public Timestamp expiryDate = DefaultInsuranceData.EXPIRY_DATE;
    public InsuranceProvider provider = DefaultInsuranceData.PROVIDER;
    public Timestamp createdDate = DefaultInsuranceData.CREATED_DATE;

    public InsuranceBuilder provider(InsuranceProvider provider) {
        this.provider = provider;
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
