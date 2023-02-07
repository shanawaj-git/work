package com.albatha.nexthealth.prescription.dto;

import com.albatha.nexthealth.prescription.domain.InsuranceProvider;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class InsuranceProviderDTO {

    public String code;
    public String eClaimLinkId;
    public String name;

    public InsuranceProviderDTO(InsuranceProvider insuranceProvider) {
        this.code = insuranceProvider.getCode();
        this.eClaimLinkId = insuranceProvider.getEClaimLinkId();
        this.name = insuranceProvider.getName();
    }
}
