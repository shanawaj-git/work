package com.albatha.nexthealth.pharmacies.graphql.query;

import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class DummyQueryResolver implements GraphQLQueryResolver {

    /*
     * At least one query resolver is required by the graphql api
     */

    public Mono<String> dummyQuery() {
        String a = "sample";
        return Mono.just("dummy");
    }
}
