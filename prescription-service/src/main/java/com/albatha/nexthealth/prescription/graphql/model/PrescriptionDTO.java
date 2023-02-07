package com.albatha.nexthealth.prescription.graphql.model;

import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PrescriptionDTO {

	private String prescriptionNumber;
	private String recordNumber;
	private OffsetDateTime visitDate;
	private String diagnosis;
	private String pin;
	private PatientDTO patient;
	private DoctorDTO doctor;
	private FacilityDTO sendingFacility;
	private java.util.List<DrugDTO> drugs;
	private InsuranceDTO insurance;
	private OffsetDateTime createdDate;

}
