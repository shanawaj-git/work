package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.defaultData.DefaultOrganization;
import com.albatha.paymentservice.model.Organization;

import java.util.UUID;

public class OrganizationBuilder {
    UUID id = DefaultOrganization.id;
    String name = DefaultOrganization.name;

    public Organization build() {
        return new Organization(id, name);
    }
}
