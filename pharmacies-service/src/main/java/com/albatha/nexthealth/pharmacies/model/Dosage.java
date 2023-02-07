package com.albatha.nexthealth.pharmacies.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dosage {
    private Integer frequency;
    private String unit;
    private Integer period;
    private Integer quantity;
    private TimeUnit timeUnit = TimeUnit.DAY;

}
