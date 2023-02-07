package com.albatha.nexthealth.prescription.graphql.model;

import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PatientDTO {

	private String patientId;
	private String emiratesId;
	private String mohId;
	private NameDTO name;
	private String email;
	private String mobileNumber;
	private OffsetDateTime dob;
	private java.util.List<AddressDTO> addresses;
	private java.util.List<InsuranceDTO> insurances;
	private OffsetDateTime createdDate;

}
