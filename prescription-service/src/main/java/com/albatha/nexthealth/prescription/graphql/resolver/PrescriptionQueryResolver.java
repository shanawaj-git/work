package com.albatha.nexthealth.prescription.graphql.resolver;

import javax.validation.Valid;

import org.springframework.stereotype.Component;

import com.albatha.nexthealth.prescription.graphql.error.PrescriptionError;
import com.albatha.nexthealth.prescription.graphql.model.ErrorDTO;
import com.albatha.nexthealth.prescription.graphql.model.PrescriptionDTO;
import com.albatha.nexthealth.prescription.graphql.model.PrescriptionQueryInputDTO;
import com.albatha.nexthealth.prescription.graphql.model.PrescriptionQueryOutputDTO;
import com.albatha.nexthealth.prescription.graphql.service.PrescriptionQueryService;

import graphql.kickstart.tools.GraphQLQueryResolver;
import graphql.schema.DataFetchingEnvironment;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class PrescriptionQueryResolver implements GraphQLQueryResolver {

	private final PrescriptionQueryService prescriptionQueryService;

	public PrescriptionQueryResolver(PrescriptionQueryService prescriptionQueryService) {
		super();
		this.prescriptionQueryService = prescriptionQueryService;
	}

	public PrescriptionQueryOutputDTO getPrescription(@Valid PrescriptionQueryInputDTO input,
			DataFetchingEnvironment dataFetchingEnvironment) {
		String prescriptionNumber = input.getPrescriptionNumber();
		log.info("Start: Resolving prescription details for prescriptionNumber {}", prescriptionNumber);
		PrescriptionQueryOutputDTO outputDTO = new PrescriptionQueryOutputDTO();
		PrescriptionDTO prescriptionDTO = prescriptionQueryService.queryPrescription(prescriptionNumber);
		if (prescriptionDTO != null) {
			outputDTO.setSuccess(true);
			outputDTO.setData(prescriptionDTO);
		} else {
			log.error("Unable to find prescription details for prescriptionNumber {}", prescriptionNumber);
			outputDTO.setSuccess(false);
			outputDTO.setError(new ErrorDTO(PrescriptionError.NOT_FOUND.code, PrescriptionError.NOT_FOUND.message));
		}

		log.info("End: Resolving prescription details for prescriptionNumber {}", prescriptionNumber);
		return outputDTO;
	}
}
