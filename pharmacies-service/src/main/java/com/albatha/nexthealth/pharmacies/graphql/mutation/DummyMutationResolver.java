package com.albatha.nexthealth.pharmacies.graphql.mutation;

import graphql.kickstart.tools.GraphQLMutationResolver;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class DummyMutationResolver implements GraphQLMutationResolver {

    /*
     * At least one mutation resolver is required by the graphql api
     */
    public Mono<String> dummyMutation(String input) {
        return Mono.just(input);
    }
}
