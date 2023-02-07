package com.albatha.nexthealth.prescription.dto;




import lombok.Data;
import java.util.Set;

@Data
public class PatientDTO {
    private String patId;
    public String emiratesId;
    public String mohId;
    public NameDTO name;
    public String email;
    public String mobileNumber;
    public String dob;
    public Set<AddressDTO> address;
    public InsuranceDTO insurance;
}