package com.albatha.nexthealth.prescription.graphql.model;

import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FacilityDTO {

	private String facilityId;
	private String name;
	private String address;
	private OffsetDateTime createdDate;

}
