package com.albatha.nexthealth.prescription.graphql.model;

import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class InsuranceProviderDTO {

	private String name;
	private String code;
	private String eClaimLinkId;
	private OffsetDateTime createdDate;

}
