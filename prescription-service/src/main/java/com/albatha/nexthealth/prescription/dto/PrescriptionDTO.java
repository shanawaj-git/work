package com.albatha.nexthealth.prescription.dto;

import lombok.Data;
import lombok.ToString;


import java.util.List;

@Data
@ToString
public class PrescriptionDTO {


    public String prescriptionNumber;
    public String recordNumber;
    public String visitDate;
    public String diagnosis;
    public List<DrugDTO> drugs;
    public String pin;
    public PatientDTO patient;
    public DoctorDTO doctor;
    public FacilityDTO sendingFacility;

}
