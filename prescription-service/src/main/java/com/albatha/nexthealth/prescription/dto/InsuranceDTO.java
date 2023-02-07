package com.albatha.nexthealth.prescription.dto;

import com.albatha.nexthealth.prescription.domain.Insurance;
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

    public InsuranceDTO(Insurance insurance) {
        this.insId = insurance.getInsId();
        this.policyNumber = insurance.getPolicyNumber();
        this.network = insurance.getNetwork();
        this.expiryDate = insurance.getExpiryDate().toString();
        this.provider = new InsuranceProviderDTO(insurance.getProvider());
    }
}