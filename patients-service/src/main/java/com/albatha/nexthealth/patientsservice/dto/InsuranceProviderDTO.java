package com.albatha.nexthealth.patientsservice.dto;

import com.albatha.nexthealth.patientsservice.model.InsuranceProvider;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class InsuranceProviderDTO {
    private String code;
    @JsonProperty("eClaimLinkId")
    private String eClaimLinkId;
    private String name;

    public InsuranceProviderDTO(InsuranceProvider insuranceProvider) {
        this.code = insuranceProvider.getCode();
        this.eClaimLinkId = insuranceProvider.getEClaimLinkId();
        this.name = insuranceProvider.getName();
    }
}
