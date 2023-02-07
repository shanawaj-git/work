package com.albatha.nexthealth.prescription.utils;

import com.albatha.nexthealth.prescription.domain.*;
import com.albatha.nexthealth.prescription.dto.*;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MockData {
    @Bean
    public InsuranceProvider insuranceProvider() {
        InsuranceProvider insuranceProviderBuilder = InsuranceProvider.builder()
                .code("1234")
                .eClaimLinkId("NXT")
                .name("Next-care")
                .build();
        return insuranceProviderBuilder;
    }

    public Insurance insurance(InsuranceProvider insuranceProvider) {
        Insurance insuranceBuilder = Insurance.builder()
                .insId("12345")
                .network("NAS")
                .policyNumber("1290837576767")
                .provider(insuranceProvider)
                .build();
        return insuranceBuilder;
    }

    public Doctor doctor(DoctorDTO doctorDTO, NameDTO docName) {
        Doctor doctorBuilder = Doctor.builder()
                .docId(doctorDTO.getDocId())
                .email(doctorDTO.getEmail())
                .lastName(docName.getLast())
                .firstName(docName.getFirst())
                .middleName(docName.getMiddle())
                .mobileNumber(doctorDTO.getMobileNumber())
                .build();
        return doctorBuilder;
    }

    public Address address(AddressDTO addressDTO) {
        Address addressBuilder = Address.builder()
                .type(addressDTO.getType())
                .country(addressDTO.getCountry())
                .postalCode(addressDTO.getPostalCode())
                .state(addressDTO.getState())
                .city(addressDTO.getCity())
                .area(addressDTO.getArea())
                .addressLine2(addressDTO.getAddressLine2())
                .addressLine1(addressDTO.getAddressLine1())
                .build();
        return addressBuilder;
    }

    public Patient patient(Set<Insurance> insuranceList, Set<Address> patientAddresses) {
        Patient patientBuilder = Patient.builder()
                .mobileNumber("9xxxxx")
                .email("test@t.com")
                .emiratesId("54748441111")
                .mohId("MK")
                .lastName("Bash")
                .firstName("New")
                .middleName("mid")
                .patId("patId")
                .insuranceSet(insuranceList)
                .addressSet(patientAddresses)
                .build();
        return patientBuilder;
    }

    public Facility facility(FacilityDTO facilityDTO) {
        Facility facility = Facility.builder()
                .address(facilityDTO.getAddress())
                .facId(facilityDTO.getFacId())
                .address(facilityDTO.getAddress())
                .name(facilityDTO.getName())
                .build();
        return facility;
    }

    public Drug drug(DrugDTO drugDTO) {

        Drug drugBuilder = Drug.builder()
                .code(drugDTO.getCode())
                .name(drugDTO.getName())
                .build();
        return drugBuilder;
    }

    public PrescribedDrug prescribedDrug(DosageDTO dosageDTO, Drug drug) {
        PrescribedDrug prescribedDrugBuilder = PrescribedDrug.builder()
                .doctorNotes(dosageDTO.getDoctorNotes())
                .frequency(dosageDTO.getFrequency())
                .route(dosageDTO.getRoute())
                .timeUnit(dosageDTO.getTimeUnit())
                .period(dosageDTO.getPeriod())
                .drug(drug)
                .build();
        return prescribedDrugBuilder;
    }
    public PrescriptionEventDTO mockPrescriptionDTO() {
        AddressDTO addressDTO = new AddressDTO();
        addressDTO.setType("Home");
        addressDTO.setAddressLine2("Dubai");
        addressDTO.setAddressLine1("Down town");
        addressDTO.setPostalCode("000000");
        addressDTO.setState("UAE");
        addressDTO.setCity("Dubai");
        addressDTO.setArea("Duabi");
        addressDTO.setCountry("United Arab Emirates");

        NameDTO docName = new NameDTO();
        docName.setFirst("AA");
        docName.setLast("ZZ");
        docName.setMiddle("CC");

        DoctorDTO doctorDTO = new DoctorDTO();
        doctorDTO.setDocId("X1Y889");
        doctorDTO.setEmail("test@test.com");
        doctorDTO.setMobileNumber("+9xxxxxxxxxxxx");
        doctorDTO.setName(docName);


        FacilityDTO facilityDTO = new FacilityDTO();
        facilityDTO.setFacId("LXCV");
        facilityDTO.setAddress("Dubai/Albarsha");
        facilityDTO.setName("Prime hospital");


        DrugDTO drugDTO = new DrugDTO();
        drugDTO.setName("Adol 50gm");
        drugDTO.setCode("12345");
        DosageDTO dosageDTO = new DosageDTO();
        dosageDTO.setDoctorNotes("take for 2 times with a hot water");
        dosageDTO.setFrequency("12");
        dosageDTO.setPeriod("1");
        dosageDTO.setQuantity("10ml");
        dosageDTO.setTimeUnit("10");
        dosageDTO.setRoute("one time");
        dosageDTO.setUnit("ML");
        drugDTO.setDosage(dosageDTO);

        InsuranceDTO insuranceDTO = new InsuranceDTO();
        insuranceDTO.setInsId(UUID.randomUUID().toString());
        insuranceDTO.setExpiryDate("2022-03-01T07:26:49.665Z");

        InsuranceProviderDTO insuranceProviderDTO = new InsuranceProviderDTO();
        insuranceProviderDTO.setCode("INSID001");
        insuranceProviderDTO.setName("AXA");
        insuranceProviderDTO.setEClaimLinkId("link");
        insuranceDTO.setProvider(insuranceProviderDTO);

        Set<AddressDTO> addressDTOSet = new HashSet<>();
        addressDTOSet.add(addressDTO);

        PatientDTO patientDTO = new PatientDTO();
        patientDTO.setAddress(addressDTOSet);
        patientDTO.setEmail("temp@gmail.com");
        patientDTO.setInsurance(insuranceDTO);
        patientDTO.setEmiratesId(UUID.randomUUID().toString());
        patientDTO.setDob("2022-03-01T07:26:49.665Z");

        NameDTO patientNameDTO = new NameDTO();
        docName.setFirst("AA");
        docName.setLast("ZZ");
        docName.setMiddle("CC");
        patientDTO.setName(patientNameDTO);


        PrescriptionDTO prescriptionDTO = new PrescriptionDTO();
        prescriptionDTO.setDiagnosis("Back-pain");
        prescriptionDTO.setPin("1234RFD");
        prescriptionDTO.setPrescriptionNumber(UUID.randomUUID().toString());
        prescriptionDTO.setRecordNumber("12345");

        List drugList = new ArrayList();
        drugList.add(drugDTO);


        prescriptionDTO.setDoctor(doctorDTO);
        prescriptionDTO.setPatient(patientDTO);
        prescriptionDTO.setSendingFacility(facilityDTO);
        prescriptionDTO.setVisitDate("2022-03-01T07:26:49.665Z");
        prescriptionDTO.setDrugs(drugList);


        PrescriptionEventDTO prescriptionEventDTO = new PrescriptionEventDTO();
        prescriptionEventDTO.setData(prescriptionDTO);
        prescriptionEventDTO.setEventType("prescriptions.new");
        return prescriptionEventDTO;
    }
}
