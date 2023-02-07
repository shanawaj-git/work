package com.albatha.nexthealth.domain.prescriptions.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DrugDTO {
    public String name;
    public String code;
    public DosageDTO dosage;
}
