package com.albatha.nexthealth.pharmacies.services;

import com.albatha.nexthealth.domain.prescriptions.dto.PrescriptionDTO;

public interface PrescriptionService {
	void ingestPrescription(PrescriptionDTO prescriptionDTO);
}
