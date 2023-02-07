package com.albatha.nexthealth.pharmacies.services.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.albatha.nexthealth.domain.prescriptions.dto.DosageDTO;
import com.albatha.nexthealth.domain.prescriptions.dto.DrugDTO;
import com.albatha.nexthealth.domain.prescriptions.dto.PrescriptionDTO;
import com.albatha.nexthealth.pharmacies.model.Code;
import com.albatha.nexthealth.pharmacies.model.Drug;
import com.albatha.nexthealth.pharmacies.model.DrugCodingSystem;
import com.albatha.nexthealth.pharmacies.model.Prescription;
import com.albatha.nexthealth.pharmacies.model.TimeUnit;
import com.albatha.nexthealth.pharmacies.repositories.DrugRepository;
import com.albatha.nexthealth.pharmacies.repositories.PrescriptionRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@ExtendWith(MockitoExtension.class)
public class PrescriptionServiceImplTests {

	@Mock
	private PrescriptionRepository prescriptionRepository;
	@Mock
	private DrugRepository drugRepository;

	@InjectMocks
	private PrescriptionServiceImpl prescriptionServiceImpl;

	private DosageDTO dummyDosageDTO(TimeUnit timeUnit) {
		return new DosageDTO("3", "tablet", "5", "oral", "1", "some notes",
				(timeUnit != null ? timeUnit : TimeUnit.DAY).value);
	}

	private List<DrugDTO> dummyDrugDTOs(DosageDTO dosageDTO, String... drugCodes) {
		return Stream.of(drugCodes)
				.map(code -> new DrugDTO("dummy-drug-name", code, dosageDTO != null ? dosageDTO : dummyDosageDTO(null)))
				.collect(Collectors.toList());
	}

	private Drug dummyDrug(String code) {
		Drug drug = new Drug();
		drug.setCodes(Arrays.asList(new Code(DrugCodingSystem.SCIENTIFIC, code != null ? code : "drug-code-default")));
		return drug;
	}

	private String[] drugCodes = { "drug-code1", "drug-code-2" };
	private Drug[] dummyDrugs = { dummyDrug(drugCodes[0]), dummyDrug(drugCodes[1]) };

	private PrescriptionDTO dummyPrescriptionDTO(List<DrugDTO> drugDTOs) {
		PrescriptionDTO prescriptionDTO = new PrescriptionDTO();
		prescriptionDTO.setPrescriptionNumber("123-456-789");
		prescriptionDTO.setDrugs(drugDTOs);
		return prescriptionDTO;
	}

	@Test
	public void shouldIngestPrescriptionCorrectly() {
		List<DrugDTO> dummyDrugDTOs = dummyDrugDTOs(null, drugCodes);
		PrescriptionDTO incomingPrescriptionDTO = dummyPrescriptionDTO(dummyDrugDTOs);

		when(drugRepository.findAllByCodesValueIn(Arrays.asList(drugCodes))).thenReturn(Flux.just(dummyDrugs));

		//ArgumentCaptor<Prescription> prescriptionCaptor = ArgumentCaptor.forClass(Prescription.class);

		when(prescriptionRepository.save(any())).thenReturn(Mono.just(new Prescription()));

		prescriptionServiceImpl.ingestPrescription(incomingPrescriptionDTO);

		//Prescription savedPrescription = prescriptionCaptor.getValue();

		//assertEquals(incomingPrescriptionDTO.getPrescriptionNumber(), savedPrescription.getPrescriptionNumber());

		//assertEquals(2, savedPrescription.getPrescribedDrugs().size());

		//assertEquals(dummyDrugs[0], savedPrescription.getPrescribedDrugs().get(0).getDrug());
		//assertEquals(dummyDrugs[1], savedPrescription.getPrescribedDrugs().get(1).getDrug());

	}
}