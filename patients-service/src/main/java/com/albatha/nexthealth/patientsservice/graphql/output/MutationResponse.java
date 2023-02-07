package com.albatha.nexthealth.patientsservice.graphql.output;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MutationResponse<T> {
    private Boolean success;
    private T data;
    private ErrorDTO error;

    public MutationResponse(Boolean success, T data) {
        this.success = success;
        this.data = data;
    }
}