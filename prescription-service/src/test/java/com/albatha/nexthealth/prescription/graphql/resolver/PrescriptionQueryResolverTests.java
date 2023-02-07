package com.albatha.nexthealth.prescription.graphql.resolver;


import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.RETURNS_MOCKS;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.support.AnnotationConfigContextLoader;

import com.albatha.nexthealth.prescription.config.GraphQLConfiguration;
import com.albatha.nexthealth.prescription.graphql.error.PrescriptionError;
import com.albatha.nexthealth.prescription.graphql.model.PrescriptionDTO;
import com.albatha.nexthealth.prescription.graphql.service.PrescriptionQueryService;
import com.graphql.spring.boot.test.GraphQLResponse;
import com.graphql.spring.boot.test.GraphQLTest;
import com.graphql.spring.boot.test.GraphQLTestTemplate;

@GraphQLTest
@ContextConfiguration(classes=GraphQLConfiguration.class)
public class PrescriptionQueryResolverTests {
	
	@Autowired
    private GraphQLTestTemplate graphQLTestTemplate;

    @MockBean
    private PrescriptionQueryService prescriptionQueryService;

	@Test
	public void testGetNonExistingPrescription() throws Exception {
		final String nonExistingPrescriptionNumber = "non-existing-prescription-number";

		doReturn(null).when(prescriptionQueryService).queryPrescription(nonExistingPrescriptionNumber);
		
		GraphQLResponse response = graphQLTestTemplate.postForResource("graphql/query-non-existing-prescription.graphql");
		assertTrue(response.isOk());
		assertFalse(response.get("$.data.prescription.success", Boolean.class));
		assertEquals(PrescriptionError.NOT_FOUND.code, response.get("$.data.prescription.error.code"));
		assertEquals(PrescriptionError.NOT_FOUND.message, response.get("$.data.prescription.error.message"));
		assertNull(response.get("$.data.prescription.data"));
	}
	
	@Test
	public void testGeExistingPrescription() throws Exception {
		final String existingPrescriptionNumber = "existing-prescription-number";

		doReturn(mock(PrescriptionDTO.class, RETURNS_MOCKS)).when(prescriptionQueryService).queryPrescription(existingPrescriptionNumber);
		
		GraphQLResponse response = graphQLTestTemplate.postForResource("graphql/query-existing-prescription.graphql");
		assertTrue(response.isOk());
		assertTrue(response.get("$.data.prescription.success", Boolean.class));
		assertNull(response.get("$.data.prescription.error"));
		assertNotNull(response.get("$.data.prescription.data", PrescriptionDTO.class));
	}
}