package com.albatha.nexthealth.prescription.graphql.resolver;

import graphql.kickstart.tools.GraphQLMutationResolver;
import org.springframework.stereotype.Component;

@Component
public class DummyMutationResolver  implements GraphQLMutationResolver {

    public String dummy(String name )
    {
        return "dummy";
    }
}
