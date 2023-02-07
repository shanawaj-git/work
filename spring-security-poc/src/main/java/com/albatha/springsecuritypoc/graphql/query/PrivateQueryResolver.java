package com.albatha.springsecuritypoc.graphql.query;

import com.albatha.springsecuritypoc.graphql.output.Data;
import com.albatha.springsecuritypoc.model.Album;
import com.albatha.springsecuritypoc.model.CurrentUser;
import com.albatha.springsecuritypoc.service.AuthorizationService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class PrivateQueryResolver implements GraphQLQueryResolver {

    @Autowired
    AuthorizationService authorizationService;

    public List<Data> getPrivateData() {
        CurrentUser user = new CurrentUser(UUID.fromString("4a5e16cc-8a8c-40ed-a3ce-d95ffffefd2d"), "Alex");
        Album album = new Album(UUID.randomUUID(), "Summer", false, user.getId());

        authorizationService.check(album, "read");

        Data output = new Data("123", "private data object");
        return List.of(output);
    }
}
