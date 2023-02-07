package com.albatha.nexthealth.pharmacies.model;

import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "prescriptions")
public class Prescription {
	@Id
	private UUID id;
	@Indexed(unique = true)
	private String prescriptionNumber;
	private List<PrescribedDrug> prescribedDrugs;
}
