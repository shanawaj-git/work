package com.albatha.nexthealth.patientsservice.graphql.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.OffsetDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
public class PatientInput {
    private String patId;
    private String emiratesId;
    private String mohId;
    private String firstName;
    private String middleName;
    private String lastName;
    private String email;
    private String mobileNumber;
    private OffsetDateTime dob;
    private Set<InsuranceInput> insurances;
}
