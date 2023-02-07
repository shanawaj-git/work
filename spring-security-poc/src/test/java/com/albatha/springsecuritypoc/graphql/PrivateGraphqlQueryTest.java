package com.albatha.springsecuritypoc.graphql;

import com.graphql.spring.boot.test.GraphQLResponse;
import com.graphql.spring.boot.test.GraphQLTest;
import com.graphql.spring.boot.test.GraphQLTestTemplate;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;

@GraphQLTest
class PrivateGraphqlQueryTest {

    @Autowired
    private GraphQLTestTemplate graphQLTestTemplate;

    @Test
    void shouldReturnNorAllowedForQueryThatRequiresAdminRole() throws IOException {
        GraphQLResponse response = graphQLTestTemplate.postForResource("getPrivateDataQuery.graphql");
        Assertions.assertTrue(response.getStatusCode().is4xxClientError());
    }
}
