package com.albatha.nexthealth.pharmacies.services.impl;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.albatha.nexthealth.domain.prescriptions.dto.DrugDTO;
import com.albatha.nexthealth.domain.prescriptions.dto.PrescriptionDTO;
import com.albatha.nexthealth.pharmacies.Mapper;
import com.albatha.nexthealth.pharmacies.model.Drug;
import com.albatha.nexthealth.pharmacies.model.PrescribedDrug;
import com.albatha.nexthealth.pharmacies.model.Prescription;
import com.albatha.nexthealth.pharmacies.repositories.DrugRepository;
import com.albatha.nexthealth.pharmacies.repositories.PrescriptionRepository;
import com.albatha.nexthealth.pharmacies.services.PrescriptionService;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;

@Slf4j
@Component
public class PrescriptionServiceImpl implements PrescriptionService {
	private final PrescriptionRepository prescriptionRepository;
	private final DrugRepository drugRepository;

	public PrescriptionServiceImpl(PrescriptionRepository prescriptionRepository, DrugRepository drugRepository) {
		this.prescriptionRepository = prescriptionRepository;
		this.drugRepository = drugRepository;
	}

	@Override
	public void ingestPrescription(PrescriptionDTO prescriptionDTO) {
		String prescriptionNumber = prescriptionDTO.getPrescriptionNumber();
		Prescription prescription = new Prescription(UUID.randomUUID(), prescriptionNumber, null);
		
		fetchPrescribedDrugs(prescriptionDTO).collect(Collectors.toList()).subscribe(prescribedDrugs -> {
			log.info("{} Drug(s) present in the prescription {}", prescribedDrugs.size(), prescriptionNumber);
			prescription.setPrescribedDrugs(prescribedDrugs);
			save(prescription);
			
		});

	}
	
	private void save(Prescription prescription) {
		prescriptionRepository.save(prescription).subscribe(result -> {
			log.info("Prescription with the prescription number {} has been saved to the database",
					prescription.getPrescriptionNumber());
		});
	}

	private Flux<PrescribedDrug> fetchPrescribedDrugs(PrescriptionDTO prescriptionDTO) {
		return drugRepository
				.findAllByCodesValueIn(
						prescriptionDTO.getDrugs().stream().map(d -> d.getCode()).collect(Collectors.toList()))
				.map(drug -> mapToPrescribedDrug(getDrugDTO(drug, prescriptionDTO.getDrugs()), drug));
	}

	private DrugDTO getDrugDTO(Drug drug, List<DrugDTO> drugs) {
		return drugs.stream()
				.filter(dto -> drug.getCodes().stream().anyMatch(code -> code.getValue().equals(dto.getCode())))
				.findFirst().orElseThrow();
	}

	private PrescribedDrug mapToPrescribedDrug(DrugDTO drugDTO, Drug drug) {
		return new PrescribedDrug(drug, Mapper.map(drugDTO.getDosage()));
	}

}
