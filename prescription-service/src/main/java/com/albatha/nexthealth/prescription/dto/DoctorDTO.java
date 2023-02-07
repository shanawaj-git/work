package com.albatha.nexthealth.prescription.dto;

import lombok.Data;

@Data
public class DoctorDTO {
    public String docId;
    public NameDTO name;
    public String email;
    public String mobileNumber;
}
