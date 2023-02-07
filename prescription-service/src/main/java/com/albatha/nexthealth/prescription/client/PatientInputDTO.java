package com.albatha.nexthealth.prescription.client;

import com.albatha.nexthealth.prescription.domain.Patient;
import com.albatha.nexthealth.prescription.dto.InsuranceDTO;
import com.albatha.nexthealth.prescription.utils.DateTimeUtils;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
public class PatientInputDTO {
    private String patId;
    private String emiratesId;
    private String mohId;
    private String firstName;
    private String middleName;
    private String lastName;
    private String email;
    private String mobileNumber;
    private OffsetDateTime dob;
    private Set<InsuranceDTO> insurances;
    public PatientInputDTO(Patient patient) {
        this.patId = patient.getPatId();
        this.emiratesId = patient.getEmiratesId();
        this.mohId = patient.getMohId();
        this.firstName = patient.getFirstName();
        this.lastName = patient.getLastName();
        this.middleName = patient.getMiddleName();
        this.email = patient.getEmail();
        this.mobileNumber = patient.getMobileNumber();
        this.dob = DateTimeUtils.toUTCOffsetDateTime(patient.getDob());
        this.insurances = patient.getInsuranceSet()
                .stream()
                .map(InsuranceDTO::new)
                .collect(Collectors.toSet());
    }
}
