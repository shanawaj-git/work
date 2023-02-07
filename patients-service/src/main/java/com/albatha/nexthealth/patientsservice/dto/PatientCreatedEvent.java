package com.albatha.nexthealth.patientsservice.dto;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class PatientCreatedEvent extends Event<PatientDTO> {

    public PatientCreatedEvent(String topic, String eventType, PatientDTO data) {
        this.topic = topic;
        this.eventType = eventType;
        this.data = data;
    }
}
