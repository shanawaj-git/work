package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.model.AppConfig;
import com.albatha.paymentservice.model.Application;
import com.albatha.paymentservice.model.Organization;

import java.util.UUID;

public class ApplicationBuilder {
    UUID id = UUID.randomUUID();
    String name = "APPLICATION NAME";
    UUID organizationId = UUID.randomUUID();
    Organization organization = null;
    AppConfig appConfig = null;

    public Application build() {
        return new Application(id, name, organizationId, organization, appConfig);
    }

    public ApplicationBuilder appConfig(AppConfig appConfig) {
        this.appConfig = appConfig;
        return this;
    }

    public ApplicationBuilder organization(Organization organization) {
        this.organization = organization;
        return this;
    }
}
