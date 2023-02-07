package com.albatha.nexthealth.prescription.graphql.service.impl;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.albatha.nexthealth.prescription.domain.Address;
import com.albatha.nexthealth.prescription.domain.Doctor;
import com.albatha.nexthealth.prescription.domain.Facility;
import com.albatha.nexthealth.prescription.domain.Insurance;
import com.albatha.nexthealth.prescription.domain.Patient;
import com.albatha.nexthealth.prescription.domain.PrescribedDrug;
import com.albatha.nexthealth.prescription.domain.Prescription;
import com.albatha.nexthealth.prescription.graphql.model.AddressDTO;
import com.albatha.nexthealth.prescription.graphql.model.DoctorDTO;
import com.albatha.nexthealth.prescription.graphql.model.DosageDTO;
import com.albatha.nexthealth.prescription.graphql.model.DrugDTO;
import com.albatha.nexthealth.prescription.graphql.model.FacilityDTO;
import com.albatha.nexthealth.prescription.graphql.model.InsuranceDTO;
import com.albatha.nexthealth.prescription.graphql.model.InsuranceProviderDTO;
import com.albatha.nexthealth.prescription.graphql.model.NameDTO;
import com.albatha.nexthealth.prescription.graphql.model.PatientDTO;
import com.albatha.nexthealth.prescription.graphql.model.PrescriptionDTO;
import com.albatha.nexthealth.prescription.repositories.PrescriptionRepository;
import com.albatha.nexthealth.prescription.utils.DateTimeUtils;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class PrescriptionQueryServiceImpl
		implements com.albatha.nexthealth.prescription.graphql.service.PrescriptionQueryService {

	private final PrescriptionRepository prescriptionRepo;
	private ModelMapper modelMapper;

	public PrescriptionQueryServiceImpl(PrescriptionRepository prescriptionRepo) {
		super();
		this.prescriptionRepo = prescriptionRepo;
		this.modelMapper = new ModelMapper();
		this.modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		this.modelMapper.addConverter(sqlTimestampToUTCOffsetDateTime);
		this.modelMapper.addConverter(sqlDateToUTCOffsetDateTime);
	}

	@Override
	@Transactional
	public PrescriptionDTO queryPrescription(String prescriptionNumber) {
		log.info("Start: Fetching prescription details for prescriptionNumber {}", prescriptionNumber);
		Prescription prescriptionEntity = prescriptionRepo.findByPrescriptionNumber(prescriptionNumber);
		PrescriptionDTO prescriptionDTO = Optional.ofNullable(prescriptionEntity).map(toPrescriptionDTO).orElse(null);
		log.info("End: Fetching prescription details for prescriptionNumber {}", prescriptionNumber);

		return prescriptionDTO;
	}

	private Function<Prescription, PrescriptionDTO> toPrescriptionDTO = new Function<Prescription, PrescriptionDTO>() {

		@Override
		public PrescriptionDTO apply(Prescription prescription) {
			PrescriptionDTO prescriptionDTO = new PrescriptionDTO();

			prescriptionDTO.setCreatedDate(DateTimeUtils.toUTCOffsetDateTime(prescription.getCreatedDate()));
			prescriptionDTO.setDiagnosis(prescription.getDiagnosis());
			prescriptionDTO.setDoctor(Optional.ofNullable(prescription.getDoctor()).map(toDoctorDTO).orElse(null));
			prescriptionDTO.setDrugs(
					Optional.ofNullable(prescription.getPrescribedDrugs()).map(toDrugDTOs).orElse(new ArrayList<>()));
			prescriptionDTO
					.setInsurance(Optional.ofNullable(prescription.getInsurance()).map(toInsuranceDTO).orElse(null));
			prescriptionDTO.setPatient(Optional.ofNullable(prescription.getPatient()).map(toPatientDTO).orElse(null));
			prescriptionDTO.setPin(prescription.getPin());
			prescriptionDTO.setPrescriptionNumber(prescription.getPrescriptionNumber());
			prescriptionDTO.setRecordNumber(prescription.getRecordNumber());
			prescriptionDTO.setSendingFacility(
					Optional.ofNullable(prescription.getSendingFacility()).map(toFacilityDTO).orElse(null));
			prescriptionDTO.setVisitDate(Optional.ofNullable(prescription.getVisitDate())
					.map(visitDate -> DateTimeUtils.toUTCOffsetDateTime(visitDate)).orElse(null));

			return prescriptionDTO;
		}
	};

	private Function<Doctor, DoctorDTO> toDoctorDTO = new Function<Doctor, DoctorDTO>() {
		@Override
		public DoctorDTO apply(Doctor doctor) {
			DoctorDTO doctorDTO = new DoctorDTO();
			doctorDTO.setCreatedDate(DateTimeUtils.toUTCOffsetDateTime(doctor.getCreatedDate()));
			doctorDTO.setDoctorId(doctor.getDocId());
			doctorDTO.setEmail(doctor.getEmail());
			doctorDTO.setMobileNumber(doctor.getMobileNumber());
			doctorDTO.setName(new NameDTO(doctor.getFirstName(), doctor.getMiddleName(), doctor.getLastName()));

			return doctorDTO;
		}
	};

	private Function<Set<PrescribedDrug>, List<DrugDTO>> toDrugDTOs = new Function<Set<PrescribedDrug>, List<DrugDTO>>() {
		@Override
		public List<DrugDTO> apply(Set<PrescribedDrug> prescribedDrugs) {

			return prescribedDrugs.stream().map(toDrugDTO).collect(Collectors.toList());
		}
	};

	private Function<PrescribedDrug, DrugDTO> toDrugDTO = new Function<PrescribedDrug, DrugDTO>() {
		@Override
		public DrugDTO apply(PrescribedDrug prescribedDrug) {
			DrugDTO drugDTO = new DrugDTO();
			drugDTO.setName(prescribedDrug.getDrug().getName());
			drugDTO.setCode(prescribedDrug.getDrug().getCode());
			drugDTO.setDosage(modelMapper.map(prescribedDrug, DosageDTO.class));

			return drugDTO;
		}
	};

	private Function<Insurance, InsuranceDTO> toInsuranceDTO = new Function<Insurance, InsuranceDTO>() {
		@Override
		public InsuranceDTO apply(Insurance insurance) {
			InsuranceDTO insuranceDTO = new InsuranceDTO();
			insuranceDTO.setCreatedDate(DateTimeUtils.toUTCOffsetDateTime(insurance.getCreatedDate()));
			insuranceDTO.setExpiryDate(DateTimeUtils.toUTCOffsetDateTime(insurance.getExpiryDate()));
			insuranceDTO.setInsuranceId(insurance.getInsId());
			insuranceDTO.setPolicyNumber(insurance.getPolicyNumber());
			insuranceDTO.setNetwork(insurance.getNetwork());
			insuranceDTO.setProvider(Optional.ofNullable(insurance.getProvider())
					.map(insuranceProvider -> modelMapper.map(insuranceProvider, InsuranceProviderDTO.class))
					.orElse(null));

			return insuranceDTO;
		}
	};

	private Function<Patient, PatientDTO> toPatientDTO = new Function<Patient, PatientDTO>() {

		@Override
		public PatientDTO apply(Patient patient) {
			PatientDTO patientDTO = new PatientDTO();
			patientDTO.setAddresses(Optional.ofNullable(patient.getAddressSet())
					.map(addresses -> addresses.stream().map(toAddressDTO).collect(Collectors.toList()))
					.orElse(new ArrayList<>()));
			patientDTO.setCreatedDate(DateTimeUtils.toUTCOffsetDateTime(patient.getCreatedDate()));
			patientDTO.setDob(
					Optional.ofNullable(patient.getDob()).map(dob -> DateTimeUtils.toUTCOffsetDateTime(dob)).orElse(null));
			patientDTO.setEmail(patient.getEmail());
			patientDTO.setEmiratesId(patient.getEmiratesId());
			patientDTO.setInsurances(Optional.ofNullable(patient.getInsuranceSet())
					.map(insurances -> insurances.stream().map(toInsuranceDTO).collect(Collectors.toList()))
					.orElse(new ArrayList<>()));
			patientDTO.setMobileNumber(patient.getMobileNumber());
			patientDTO.setMohId(patient.getMohId());
			patientDTO.setName(new NameDTO(patient.getFirstName(), patient.getMiddleName(), patient.getLastName()));
			patientDTO.setPatientId(patient.getPatId());

			return patientDTO;
		}
	};

	private Function<Address, AddressDTO> toAddressDTO = new Function<Address, AddressDTO>() {

		@Override
		public AddressDTO apply(Address address) {

			return modelMapper.map(address, AddressDTO.class);
		}

	};

	private Function<Facility, FacilityDTO> toFacilityDTO = new Function<Facility, FacilityDTO>() {

		@Override
		public FacilityDTO apply(Facility facilty) {
			FacilityDTO facilityDTO = modelMapper.map(facilty, FacilityDTO.class);
			facilityDTO.setFacilityId(facilty.getFacId());

			return facilityDTO;
		}

	};

	private Converter<Timestamp, OffsetDateTime> sqlTimestampToUTCOffsetDateTime = new AbstractConverter<Timestamp, OffsetDateTime>() {

		@Override
		protected OffsetDateTime convert(Timestamp source) {

			return DateTimeUtils.toUTCOffsetDateTime(source);
		}
	};

	private Converter<Date, OffsetDateTime> sqlDateToUTCOffsetDateTime = new AbstractConverter<Date, OffsetDateTime>() {

		@Override
		protected OffsetDateTime convert(Date source) {

			return DateTimeUtils.toUTCOffsetDateTime(source);
		}
	};

}
