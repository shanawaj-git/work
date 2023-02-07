package com.albatha.nexthealth.prescription.dto;

import lombok.Data;

@Data
public class DrugDTO {

    public String name;
    public String code;
    public DosageDTO dosage;

}
