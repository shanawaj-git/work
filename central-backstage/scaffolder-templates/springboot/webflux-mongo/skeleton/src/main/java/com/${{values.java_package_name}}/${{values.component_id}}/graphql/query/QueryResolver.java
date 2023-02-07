package com.${{values.java_package_name}}.${{values.component_id}}.graphql.query;

import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class QueryResolver implements GraphQLQueryResolver {

    /*
     *  Atleast one query resolver is expected by the graphql api
     *
     */
    public String getDummy() {
        return "dummy";
    }
}
