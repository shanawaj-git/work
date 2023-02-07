package com.albatha.springsecuritypoc.graphql.mutation;

import graphql.kickstart.tools.GraphQLMutationResolver;
import org.springframework.stereotype.Component;

@Component
public class PublicMutationResolver implements GraphQLMutationResolver {

    public String createPublicData() {
        return "Creating DataPublic data";
    }
}