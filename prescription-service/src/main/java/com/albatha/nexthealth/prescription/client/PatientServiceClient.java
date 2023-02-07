package com.albatha.nexthealth.prescription.client;

import com.albatha.nexthealth.prescription.exception.PatientCreationException;
import com.albatha.nexthealth.prescription.graphql.model.GraphqlMutationBody;
import com.albatha.nexthealth.prescription.graphql.model.GraphqlResponse;
import com.albatha.nexthealth.prescription.graphql.model.MutationInput;
import com.albatha.nexthealth.prescription.graphql.model.Mutations;
import com.albatha.nexthealth.prescription.graphql.model.PatientMutationResponse;
import com.albatha.nexthealth.prescription.utils.GraphqlSchemaReaderUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.RequestEntity;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URI;

@Component
public class PatientServiceClient {
    final
    ObjectMapper customObjectMapper;

    final
    RestTemplate webTemplate;

    @Value("${patient-service-uri}") String patientServiceUri;

    public PatientServiceClient(ObjectMapper customObjectMapper, RestTemplate webTemplate) {
        this.customObjectMapper = customObjectMapper;
        this.webTemplate = webTemplate;
    }

    public GraphqlResponse<PatientMutationResponse> createPatient(PatientInputDTO patientInput) throws PatientCreationException, IOException {
        GraphqlResponse<PatientMutationResponse> response = sendCreatePatientMutationRequest(patientInput);
        return processResponse(response);
    }

    private GraphqlResponse<PatientMutationResponse> processResponse(GraphqlResponse<PatientMutationResponse> response) throws PatientCreationException {
        if(response == null || response.isErroneous())
            throw new PatientCreationException("Unable to create Patient");
        return response;
    }

    private GraphqlResponse<PatientMutationResponse> sendCreatePatientMutationRequest(PatientInputDTO patientInput) throws IOException {
        RequestEntity<GraphqlMutationBody> request = mutationRequestEntity(Mutations.CREATE_PATIENT.label, patientInput);

        return webTemplate
            .exchange(request, new ParameterizedTypeReference<GraphqlResponse<PatientMutationResponse>>() {})
            .getBody();
    }

    private RequestEntity<GraphqlMutationBody> mutationRequestEntity(String mutationName, Object input) throws IOException {
        return RequestEntity
            .post(URI.create(patientServiceUri))
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)
            .body(mutationRequestBody(mutationName, input));
    }

    private GraphqlMutationBody mutationRequestBody(String mutationName, Object input) throws IOException {
        MutationInput mutationInput = new MutationInput(input);
        String variables = customObjectMapper.writeValueAsString(mutationInput);
        String mutation = GraphqlSchemaReaderUtil.getSchemaFromFileName(mutationName);
        return new GraphqlMutationBody(mutation, variables);
    }
}
