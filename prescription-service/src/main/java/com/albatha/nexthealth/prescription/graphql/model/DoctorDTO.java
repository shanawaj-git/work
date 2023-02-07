package com.albatha.nexthealth.prescription.graphql.model;

import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DoctorDTO {

	private String doctorId;
	private NameDTO name;
	private String email;
	private String mobileNumber;
	private OffsetDateTime createdDate;

}
