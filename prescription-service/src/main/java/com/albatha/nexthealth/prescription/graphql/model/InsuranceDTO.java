package com.albatha.nexthealth.prescription.graphql.model;

import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class InsuranceDTO {

	private String insuranceId;
	private String policyNumber;
	private InsuranceProviderDTO provider;
	private OffsetDateTime createdDate;
	private OffsetDateTime expiryDate;
	private String network;

}
