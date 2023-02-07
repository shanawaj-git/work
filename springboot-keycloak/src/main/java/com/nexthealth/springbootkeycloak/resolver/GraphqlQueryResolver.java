package com.nexthealth.springbootkeycloak.resolver;

import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.stereotype.Component;

@Component
public class GraphqlQueryResolver implements GraphQLQueryResolver {

   /*
   *  one query resolver is expected by the graphql api
   *
    */
    public String  getDummy()
    {
        return "dummy";
    }
}
