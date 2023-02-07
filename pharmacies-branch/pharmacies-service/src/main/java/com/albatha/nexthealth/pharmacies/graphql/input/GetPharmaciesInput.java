package com.albatha.nexthealth.pharmacies.graphql.input;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetPharmaciesInput {
    private Location location;
    private String prescriptionNumber;
}

class SortBy {
    private Order orderByDeliveryTime;
    private Order orderByPharmacyName;
}

enum Order {
    ASC, DESC
}