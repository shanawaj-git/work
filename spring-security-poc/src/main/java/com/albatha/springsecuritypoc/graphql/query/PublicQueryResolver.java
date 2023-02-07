package com.albatha.springsecuritypoc.graphql.query;

import com.albatha.springsecuritypoc.graphql.output.Data;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PublicQueryResolver implements GraphQLQueryResolver {

    public List<Data> getPublicData() {
        Data output = new Data("123", "data object");
        return List.of(output);
    }
}
