package com.albatha.nexthealth.prescription.dto;

import lombok.Data;

@Data
public class PrescriptionEventDTO {

    public String topic;
    public String eventType;
    public PrescriptionDTO data;
}
