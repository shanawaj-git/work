package com.albatha.nexthealth.pharmacies.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Event<T> {
    protected String topic;
    protected String eventType;
    protected T data;
}
