package com.albatha.nexthealth.patientsservice.graphql.output;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GraphqlResponse<T extends GraphqlData> {
    private Object[] errors;
    private T data;

    public Boolean isErroneous() {
        return this.data == null ||
                Boolean.TRUE.equals(this.data.isErroneous()) ||
                this.errors.length != 0;
    }
}

