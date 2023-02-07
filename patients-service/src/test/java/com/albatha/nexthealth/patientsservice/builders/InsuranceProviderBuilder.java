package com.albatha.nexthealth.patientsservice.builders;

import com.albatha.nexthealth.patientsservice.defaultData.DefaultInsuranceProviderData;
import com.albatha.nexthealth.patientsservice.defaultData.DefaultPatientData;
import com.albatha.nexthealth.patientsservice.model.InsuranceProvider;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.UUID;

public class InsuranceProviderBuilder {

    String code = DefaultInsuranceProviderData.CODE;
    String eClaimLinkId = DefaultInsuranceProviderData.E_CLAIM_LINK_ID;
    String name = DefaultInsuranceProviderData.NAME;

    public InsuranceProvider build() {
        return new InsuranceProvider(
            null, code, eClaimLinkId, name, null
        );
    }
}
