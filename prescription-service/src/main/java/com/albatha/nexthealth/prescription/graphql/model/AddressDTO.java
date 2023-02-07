package com.albatha.nexthealth.prescription.graphql.model;

import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddressDTO {

	private String addressId;
	private String addressLine1;
	private String addressLine2;
	private String area;
	private String city;
	private String state;
	private String postalCode;
	private String type;
	private String country;
	private OffsetDateTime createdDate;

}
