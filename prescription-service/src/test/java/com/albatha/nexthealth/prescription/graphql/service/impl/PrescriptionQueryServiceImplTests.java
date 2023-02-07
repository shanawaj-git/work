package com.albatha.nexthealth.prescription.graphql.service.impl;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.mockito.Mockito.doReturn;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.albatha.nexthealth.prescription.domain.Address;
import com.albatha.nexthealth.prescription.domain.Doctor;
import com.albatha.nexthealth.prescription.domain.Drug;
import com.albatha.nexthealth.prescription.domain.Facility;
import com.albatha.nexthealth.prescription.domain.Insurance;
import com.albatha.nexthealth.prescription.domain.InsuranceProvider;
import com.albatha.nexthealth.prescription.domain.Patient;
import com.albatha.nexthealth.prescription.domain.PrescribedDrug;
import com.albatha.nexthealth.prescription.domain.Prescription;
import com.albatha.nexthealth.prescription.graphql.model.AddressDTO;
import com.albatha.nexthealth.prescription.graphql.model.DoctorDTO;
import com.albatha.nexthealth.prescription.graphql.model.DrugDTO;
import com.albatha.nexthealth.prescription.graphql.model.FacilityDTO;
import com.albatha.nexthealth.prescription.graphql.model.InsuranceDTO;
import com.albatha.nexthealth.prescription.graphql.model.PatientDTO;
import com.albatha.nexthealth.prescription.graphql.model.PrescriptionDTO;
import com.albatha.nexthealth.prescription.repositories.PrescriptionRepository;
import com.albatha.nexthealth.prescription.utils.DateTimeUtils;

@ExtendWith(MockitoExtension.class)
public class PrescriptionQueryServiceImplTests {

	private final static String PRESCRIPTION_NUMBER = "a-dummy-presc-num";

	@Mock
	private PrescriptionRepository prescriptionRepo;

	@InjectMocks
	private PrescriptionQueryServiceImpl prescriptionQueryServiceImpl;

	@Test
	public void testQueryNonExistingPrescription() throws Exception {
		PrescriptionDTO result;

		doReturn(null).when(prescriptionRepo).findByPrescriptionNumber(PRESCRIPTION_NUMBER);

		result = prescriptionQueryServiceImpl.queryPrescription(PRESCRIPTION_NUMBER);

		assertNull(result);
	}

	@Test
	public void testQueryPrescriptionPopulatesPrescriptionDetailFields() throws Exception {
		String recordNumber = "dummy-record-number", diagnosis = "a-dummy-diagonosis", pin = "a-dummy-pin";
		Timestamp createdDate = new Timestamp(System.currentTimeMillis()),
				visitDate = new Timestamp(System.currentTimeMillis());

		Prescription prescription = new Prescription();
		prescription.setCreatedDate(createdDate);
		prescription.setPrescriptionNumber(PRESCRIPTION_NUMBER);
		prescription.setRecordNumber(recordNumber);
		prescription.setPrescriptionId(1L);
		prescription.setDiagnosis(diagnosis);
		prescription.setPin(pin);
		prescription.setVisitDate(visitDate);

		doReturn(prescription).when(prescriptionRepo).findByPrescriptionNumber(PRESCRIPTION_NUMBER);

		PrescriptionDTO prescriptionDTO = prescriptionQueryServiceImpl.queryPrescription(PRESCRIPTION_NUMBER);

		assertNotNull(prescriptionDTO);
		assertEquals(PRESCRIPTION_NUMBER, prescriptionDTO.getPrescriptionNumber());
		assertEquals(recordNumber, prescriptionDTO.getRecordNumber());
		assertEquals(diagnosis, prescriptionDTO.getDiagnosis());
		assertEquals(pin, prescriptionDTO.getPin());
		assertEquals(DateTimeUtils.toUTCOffsetDateTime(createdDate), prescriptionDTO.getCreatedDate());
		assertEquals(DateTimeUtils.toUTCOffsetDateTime(visitDate), prescriptionDTO.getVisitDate());
	}

	@Test
	public void testQueryPrescriptionPopulatesDoctorFields() throws Exception {
		String doctorId = "a-dummy-doc-id", email = "a-dummy-email", firstName = "doc-f-name",
				middleName = "doc-middle-name", lastName = "doc-last-name", mobileNumber = "+971XXXXXXXXX";

		Timestamp createdDate = new Timestamp(System.currentTimeMillis());

		Prescription prescription = dummyPrescription();

		Doctor doctor = new Doctor();

		doctor.setCreatedDate(createdDate);
		doctor.setDocId(doctorId);
		doctor.setEmail(email);
		doctor.setFirstName(firstName);
		doctor.setLastName(lastName);
		doctor.setMiddleName(middleName);
		doctor.setMobileNumber(mobileNumber);
		
		prescription.setDoctor(doctor);

		doReturn(prescription).when(prescriptionRepo).findByPrescriptionNumber(PRESCRIPTION_NUMBER);

		PrescriptionDTO prescriptionDTO = prescriptionQueryServiceImpl.queryPrescription(PRESCRIPTION_NUMBER);

		DoctorDTO doctorDTO = prescriptionDTO.getDoctor();
		assertNotNull(doctorDTO);
		assertEquals(DateTimeUtils.toUTCOffsetDateTime(createdDate), doctorDTO.getCreatedDate());
		assertEquals(doctorId, doctorDTO.getDoctorId());
		assertEquals(email, doctorDTO.getEmail());
		assertEquals(firstName, doctorDTO.getName().getFirst());
		assertEquals(middleName, doctorDTO.getName().getMiddle());
		assertEquals(lastName, doctorDTO.getName().getLast());
		assertEquals(mobileNumber, doctorDTO.getMobileNumber());
	}

	@Test
	public void testQueryPrescriptionPopulatesDrugsList() throws Exception {
		String doctorNotes = "doc-notes", drugCode = "drug-code", drugName = "drug-name", frequency = "3",
				timeUnit = "DAY", period = "7", quantity = "1", route = "mouth", unit = "unit";

		Prescription prescription = dummyPrescription();

		Set<PrescribedDrug> prescribedDrugs = new HashSet<>();
		PrescribedDrug prescribedDrug = new PrescribedDrug();
		prescribedDrug.setDoctorNotes(doctorNotes);
		prescribedDrug.setFrequency(frequency);
		prescribedDrug.setPeriod(period);
		prescribedDrug.setQuantity(quantity);
		prescribedDrug.setRoute(route);
		prescribedDrug.setTimeUnit(timeUnit);
		prescribedDrug.setUnit(timeUnit);
		prescribedDrug.setUnit(unit);

		Drug drug = new Drug();
		drug.setCode(drugCode);
		drug.setName(drugName);
		prescribedDrug.setDrug(drug);

		prescribedDrugs.add(prescribedDrug);
		prescription.setPrescribedDrugs(prescribedDrugs);

		doReturn(prescription).when(prescriptionRepo).findByPrescriptionNumber(PRESCRIPTION_NUMBER);

		PrescriptionDTO prescriptionDTO = prescriptionQueryServiceImpl.queryPrescription(PRESCRIPTION_NUMBER);

		assertNotNull(prescriptionDTO.getDrugs());
		assertNotNull(prescriptionDTO.getDrugs().get(0));
		DrugDTO drugDTO = prescriptionDTO.getDrugs().get(0);
		assertEquals(drugCode, drugDTO.getCode());
		assertEquals(drugName, drugDTO.getName());
		assertEquals(frequency, drugDTO.getDosage().getFrequency());
		assertEquals(timeUnit, drugDTO.getDosage().getTimeUnit());
		assertEquals(period, drugDTO.getDosage().getPeriod());
		assertEquals(quantity, drugDTO.getDosage().getQuantity());
		assertEquals(timeUnit, drugDTO.getDosage().getTimeUnit());
		assertEquals(unit, drugDTO.getDosage().getUnit());

	}

	@Test
	public void testQueryPrescriptionPopulatesPatientFields() throws Exception {
		String patientId = "a-dummy-pat-id", emitatesId = "XXX-XXXXXX-XXXX-X", email = "a-dummy-email",
				firstName = "pat-f-name", middleName = "pat-middle-name", lastName = "pat-last-name",
				mobileNumber = "+971XXXXXXXXX", mohId = "mohId", addressLine1 = "adressLine1", addressType = "HOME",
				addressLine2 = "adressLine2", city = "city", state = "state", area = "area", country = "country",
				postalCode = "XXXXXX";

		Timestamp createdDate = new Timestamp(System.currentTimeMillis()),
				dob = new Timestamp(System.currentTimeMillis());

		Prescription prescription = dummyPrescription();

		Patient patient = new Patient();

		patient.setCreatedDate(createdDate);
		patient.setPatId(patientId);
		patient.setEmail(email);
		patient.setFirstName(firstName);
		patient.setLastName(lastName);
		patient.setMiddleName(middleName);
		patient.setMobileNumber(mobileNumber);
		patient.setEmiratesId(emitatesId);
		patient.setDob(dob);
		patient.setMohId(mohId);

		Address address = new Address();
		address.setAddressLine1(addressLine1);
		address.setAddressLine2(addressLine2);
		address.setArea(area);
		address.setCity(city);
		address.setCountry(country);
		address.setPostalCode(postalCode);
		address.setState(state);
		address.setType(addressType);
		address.setCreatedDate(createdDate);
		patient.setAddressSet(Set.of(address));

		prescription.setPatient(patient);

		doReturn(prescription).when(prescriptionRepo).findByPrescriptionNumber(PRESCRIPTION_NUMBER);

		PrescriptionDTO prescriptionDTO = prescriptionQueryServiceImpl.queryPrescription(PRESCRIPTION_NUMBER);
		PatientDTO patientDTO = prescriptionDTO.getPatient();
		assertNotNull(patientDTO);
		assertEquals(DateTimeUtils.toUTCOffsetDateTime(createdDate), patientDTO.getCreatedDate());
		assertEquals(DateTimeUtils.toUTCOffsetDateTime(dob), patientDTO.getDob());
		assertEquals(patientId, patientDTO.getPatientId());
		assertEquals(email, patientDTO.getEmail());
		assertEquals(firstName, patientDTO.getName().getFirst());
		assertEquals(middleName, patientDTO.getName().getMiddle());
		assertEquals(lastName, patientDTO.getName().getLast());
		assertEquals(mobileNumber, patientDTO.getMobileNumber());
		assertEquals(mohId, patientDTO.getMohId());
		assertEquals(1, patientDTO.getAddresses().size());
		AddressDTO addressDTO = patientDTO.getAddresses().get(0);
		assertEquals(addressLine1, addressDTO.getAddressLine1());
		assertEquals(addressLine2, addressDTO.getAddressLine2());
		assertEquals(area, addressDTO.getArea());
		assertEquals(state, addressDTO.getState());
		assertEquals(country, addressDTO.getCountry());
		assertEquals(postalCode, addressDTO.getPostalCode());
		assertEquals(city, addressDTO.getCity());
		assertEquals(addressType, addressDTO.getType());
	}

	@Test
	public void testQueryPrescriptionPopulatesInsuranceFields() throws Exception {
		String insuranceId = "ins-id", network = "network", policyNumebr = "policyNumber",
				providerCode = "provider-code", providerName = "provider-name", eClaimLinkId = "e-Claim-Link-Id";

		Timestamp createdDate = new Timestamp(System.currentTimeMillis());
		Timestamp expiryDate = new Timestamp(System.currentTimeMillis());

		Prescription prescription = dummyPrescription();

		Insurance insurance = new Insurance();

		insurance.setCreatedDate(createdDate);
		insurance.setExpiryDate(expiryDate);
		insurance.setInsId(insuranceId);
		insurance.setNetwork(network);
		insurance.setPolicyNumber(policyNumebr);
		InsuranceProvider insuranceProvider = new InsuranceProvider();
		insuranceProvider.setCode(providerCode);
		insuranceProvider.setCreatedDate(createdDate);
		insuranceProvider.setEClaimLinkId(eClaimLinkId);
		insuranceProvider.setName(providerName);
		insurance.setProvider(insuranceProvider);
		
		prescription.setInsurance(insurance);

		doReturn(prescription).when(prescriptionRepo).findByPrescriptionNumber(PRESCRIPTION_NUMBER);

		PrescriptionDTO prescriptionDTO = prescriptionQueryServiceImpl.queryPrescription(PRESCRIPTION_NUMBER);

		InsuranceDTO insuranceDTO = prescriptionDTO.getInsurance();
		assertNotNull(insuranceDTO);
		assertEquals(DateTimeUtils.toUTCOffsetDateTime(createdDate), insuranceDTO.getCreatedDate());
		assertEquals(DateTimeUtils.toUTCOffsetDateTime(expiryDate), insuranceDTO.getExpiryDate());
		assertEquals(insuranceId, insuranceDTO.getInsuranceId());
		assertEquals(network, insuranceDTO.getNetwork());
		assertEquals(policyNumebr, insuranceDTO.getPolicyNumber());
		assertEquals(providerCode, insuranceDTO.getProvider().getCode());
		assertEquals(DateTimeUtils.toUTCOffsetDateTime(createdDate), insuranceDTO.getProvider().getCreatedDate());
		assertEquals(eClaimLinkId, insuranceDTO.getProvider().getEClaimLinkId());
		assertEquals(providerName, insuranceDTO.getProvider().getName());
	}
	
	@Test
	public void testQueryPrescriptionPopulatesSendingFacilityFields() throws Exception {
		String facilityId = "a-dummy-fac-id", name = "fac-name", address = "fac-address1, address2, etc";

		Timestamp createdDate = new Timestamp(System.currentTimeMillis());

		Prescription prescription = dummyPrescription();

		Facility facility = new Facility();

		facility.setCreatedDate(createdDate);
		facility.setAddress(address);
		facility.setFacId(facilityId);
		facility.setName(name);
		
		prescription.setSendingFacility(facility);;

		doReturn(prescription).when(prescriptionRepo).findByPrescriptionNumber(PRESCRIPTION_NUMBER);

		PrescriptionDTO prescriptionDTO = prescriptionQueryServiceImpl.queryPrescription(PRESCRIPTION_NUMBER);

		FacilityDTO facilityDTO = prescriptionDTO.getSendingFacility();
		assertNotNull(facilityDTO);
		assertEquals(DateTimeUtils.toUTCOffsetDateTime(createdDate), facilityDTO.getCreatedDate());
		assertEquals(facilityId, facilityDTO.getFacilityId());
		assertEquals(address, facilityDTO.getAddress());
		assertEquals(name, facilityDTO.getName());
	}
	
	private Prescription dummyPrescription() {
		Prescription prescription = new Prescription();
		Timestamp createdDate = new Timestamp(System.currentTimeMillis());
		prescription.setCreatedDate(createdDate);
		return prescription;
	}
}