package com.albatha.nexthealth.prescription.graphql.error;

public enum PrescriptionError {

	NOT_FOUND("PRESC_ERR_001", "No prescriptions found matching the supplied prescription number");
	
	public final String code;
	public final String message;
	
	private PrescriptionError(String code, String message) {
		this.code = code;
		this.message = message;
	}
}
