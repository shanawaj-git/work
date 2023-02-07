package com.albatha.nexthealth.domain.prescriptions.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class InsuranceDTO {
    public String insId;
    public String policyNumber;
    public String network;
    public String expiryDate;
    public InsuranceProviderDTO provider;
}