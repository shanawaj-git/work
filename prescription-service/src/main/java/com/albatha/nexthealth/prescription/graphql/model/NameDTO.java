package com.albatha.nexthealth.prescription.graphql.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class NameDTO {

	private String first;
	private String middle;
	private String last;

}
