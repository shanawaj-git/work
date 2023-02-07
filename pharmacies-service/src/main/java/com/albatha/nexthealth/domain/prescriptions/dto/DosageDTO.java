package com.albatha.nexthealth.domain.prescriptions.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DosageDTO {
    private String frequency;
    private String unit;
    private String period;
    private String route;
    private String quantity;
    private String doctorNotes;
    private String timeUnit;
}
