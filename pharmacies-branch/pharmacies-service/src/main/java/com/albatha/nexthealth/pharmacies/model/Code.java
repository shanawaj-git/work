package com.albatha.nexthealth.pharmacies.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Code {
    private DrugCodingSystem system;
    private String value;
}
