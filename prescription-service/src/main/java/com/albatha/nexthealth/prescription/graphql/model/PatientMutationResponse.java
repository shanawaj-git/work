package com.albatha.nexthealth.prescription.graphql.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PatientMutationResponse extends GraphqlData {
    private MutationResponse createPatient;

    @Override
    public Boolean isErroneous() {
        return Boolean.FALSE.equals(this.createPatient.getSuccess());
    }
}
