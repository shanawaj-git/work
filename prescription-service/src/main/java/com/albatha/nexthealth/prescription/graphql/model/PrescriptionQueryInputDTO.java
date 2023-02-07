package com.albatha.nexthealth.prescription.graphql.model;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PrescriptionQueryInputDTO {

	@NotBlank
	private String prescriptionNumber;

}
