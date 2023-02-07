package com.albatha.nexthealth.domain.prescriptions.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class InsuranceProviderDTO {
    public String code;
    public String eClaimLinkId;
    public String name;
}
