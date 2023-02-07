package com.albatha.nexthealth.pharmacies.graphql.output;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GraphqlResponse<T extends GraphqlData> {
    private Boolean success;
    private T data;
    private ErrorDTO error;

    public GraphqlResponse(boolean success, T data, ErrorDTO error) {
        this.success = success;
        this.error = error;
    }

    public Boolean isErroneous() {
        return this.data == null ||
                Boolean.TRUE.equals(this.data.isErroneous());
    }
}

