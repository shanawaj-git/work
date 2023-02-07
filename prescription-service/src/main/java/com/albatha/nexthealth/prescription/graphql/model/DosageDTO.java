package com.albatha.nexthealth.prescription.graphql.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DosageDTO {

	private String frequency;
	private String unit;
	private String period;
	private String route;
	private String quantity;
	private String timeUnit;
	private String doctorNotes;
}
