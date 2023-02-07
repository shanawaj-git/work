package com.albatha.nexthealth.patientsservice.graphql.query;

import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.stereotype.Component;

@Component
public class DummyQueryResolver implements GraphQLQueryResolver {

    /*
     * atleast one query resolver is expected by the graphql api
     *
     */
    public String getDummy() {
        return "dummy";
    }
}
