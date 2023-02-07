package com.albatha.nexthealth.patientsservice.dto;

import com.albatha.nexthealth.patientsservice.model.Patient;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class PatientDTO {
    private String patId;
    private String emiratesId;
    private String mohId;
    private String firstName;
    private String middleName;
    private String lastName;
    private String email;
    private String mobileNumber;
    private String dob;
    private Set<AddressDTO> address;
    private Set<InsuranceDTO> insurances;

    public PatientDTO(Patient patient) {
        this.patId = patient.getPatId();
        this.emiratesId = patient.getEmiratesId();
        this.firstName = patient.getFirstName();
        this.middleName = patient.getMiddleName();
        this.lastName = patient.getLastName();
        this.email = patient.getEmail();
        this.mobileNumber = patient.getMobileNumber();
        this.dob = patient.getDob() != null? patient.getDob().toString(): null;
        this.insurances = patient.getInsuranceSet().stream().map(InsuranceDTO::new).collect(Collectors.toSet());
    }
}
