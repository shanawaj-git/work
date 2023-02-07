package com.albatha.nexthealth.prescription.graphql.model;

import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MutationResponse {
    private Boolean success;
    private Object data;
    private ErrorDTO error;
}