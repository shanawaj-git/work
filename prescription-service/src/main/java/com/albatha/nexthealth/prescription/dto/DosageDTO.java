package com.albatha.nexthealth.prescription.dto;

import lombok.Data;

@Data
public class DosageDTO {

    private String frequency;
    private String unit;
    private String period;
    private String route;
    private String quantity;
    private String doctorNotes;
    private String timeUnit;


}
