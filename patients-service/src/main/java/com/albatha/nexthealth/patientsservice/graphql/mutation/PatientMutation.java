package com.albatha.nexthealth.patientsservice.graphql.mutation;

import com.albatha.nexthealth.patientsservice.dto.PatientDTO;
import com.albatha.nexthealth.patientsservice.graphql.input.PatientInput;
import com.albatha.nexthealth.patientsservice.graphql.output.MutationResponse;
import com.albatha.nexthealth.patientsservice.model.Patient;
import com.albatha.nexthealth.patientsservice.services.PatientService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
@Slf4j
public class PatientMutation implements GraphQLMutationResolver {

    final PatientService patientService;

    public PatientMutation(PatientService patientService) {
        this.patientService = patientService;
    }

    @Transactional
    public MutationResponse<PatientDTO> createPatient(PatientInput patientInput) {
        Patient patient = patientService.createPatient(patientInput);
        return handleCreatePatientResponse(patient);
    }

    private MutationResponse<PatientDTO> handleCreatePatientResponse(Patient patient) {
        return patient != null?
            new MutationResponse<>(true, new PatientDTO(patient)):
            new MutationResponse<>(false, null);
    }
}
