package com.albatha.nexthealth.pharmacies.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pricing {
    private double price;
    private Currency currency = Currency.AED;
    public Pricing(double price) {
        this.price = price;
    }
}
