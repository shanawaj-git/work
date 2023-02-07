package com.albatha.nexthealth.prescription.graphql.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PrescriptionQueryOutputDTO {

	private Boolean success;
	private PrescriptionDTO data;
	private ErrorDTO error;

}
