package com.albatha.nexthealth.patientsservice.dto;

import com.albatha.nexthealth.patientsservice.model.Insurance;
import lombok.Data;

@Data
public class InsuranceDTO {
    private String insId;
    private String policyNumber;
    private String network;
    private String expiryDate;
    private InsuranceProviderDTO insuranceProvider;

    public InsuranceDTO(Insurance insurance) {
        this.insId = insurance.getInsId();
        this.policyNumber = insurance.getPolicyNumber();
        this.network = insurance.getNetwork();
        this.expiryDate = insurance.getExpiryDate()!=null?insurance.getExpiryDate().toString():null;
        this.insuranceProvider = new InsuranceProviderDTO(insurance.getInsuranceProvider());
    }
}