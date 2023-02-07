package com.albatha.nexthealth.prescription.transformer;

import com.albatha.nexthealth.prescription.domain.*;
import com.albatha.nexthealth.prescription.dto.InsuranceDTO;
import com.albatha.nexthealth.prescription.dto.PrescriptionDTO;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Component
@Slf4j
public class PrescriptionMapper {

    public Prescription convertPrescriptionDTOToEntity(PrescriptionDTO prescriptionDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Converter<String, Timestamp> toStringDate = new AbstractConverter<String, Timestamp>() {
            @Override
            protected Timestamp convert(String source) {
                return new Timestamp(OffsetDateTime.parse(source).toInstant().toEpochMilli());
            }
        };
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        modelMapper.addConverter(toStringDate);

        Prescription prescription = modelMapper.map(prescriptionDTO, Prescription.class);

        Set<PrescribedDrug> prescribedDrugSet = new HashSet<>();
        prescriptionDTO.getDrugs().forEach((drugDTO) -> {
            PrescribedDrug prescribedDrug = modelMapper.map(drugDTO.getDosage(), PrescribedDrug.class);
            Drug drug = modelMapper.map(drugDTO, Drug.class);
            prescribedDrug.setDrug(drug);
            prescribedDrugSet.add(prescribedDrug);
        });
        Set<Address> addressSet = new HashSet<>();
        prescriptionDTO.getPatient().getAddress().forEach((add) -> {
            Address address = modelMapper.map(add, Address.class);
            addressSet.add(address);
        });

        InsuranceDTO insuranceDTO = prescriptionDTO.getPatient().getInsurance();
        Set<Insurance> insuranceSet = new HashSet<>();
        Insurance insurance = modelMapper.map(insuranceDTO, Insurance.class);
        insuranceSet.add(insurance);

        prescription.getDoctor().setFirstName(prescriptionDTO.getDoctor().getName().first);
        prescription.getDoctor().setMiddleName(prescriptionDTO.getDoctor().getName().middle);
        prescription.getDoctor().setLastName(prescriptionDTO.getDoctor().getName().last);

        prescription.getPatient().setFirstName(prescriptionDTO.getPatient().getName().first);
        prescription.getPatient().setMiddleName(prescriptionDTO.getPatient().getName().middle);
        prescription.getPatient().setLastName(prescriptionDTO.getPatient().getName().last);

        prescription.setPrescribedDrugs(prescribedDrugSet);
        prescription.getPatient().setAddressSet(addressSet);
        prescription.getPatient().setInsuranceSet(insuranceSet);

        return prescription;
    }
}
