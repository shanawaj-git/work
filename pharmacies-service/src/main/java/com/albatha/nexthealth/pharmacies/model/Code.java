package com.albatha.nexthealth.pharmacies.model;

import org.springframework.data.mongodb.core.index.Indexed;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Code {
    private DrugCodingSystem system;
    @Indexed()
    private String value;
}
