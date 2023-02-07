package com.albatha.nexthealth.prescription.graphql.service;

import com.albatha.nexthealth.prescription.graphql.model.PrescriptionDTO;

public interface PrescriptionQueryService {
	PrescriptionDTO queryPrescription(String prescriptionNumber);
}
