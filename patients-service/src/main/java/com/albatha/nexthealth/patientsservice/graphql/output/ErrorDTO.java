package com.albatha.nexthealth.patientsservice.graphql.output;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ErrorDTO {
	private String code;
	private String message;
}
