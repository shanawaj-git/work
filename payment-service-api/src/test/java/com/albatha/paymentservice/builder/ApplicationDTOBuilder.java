package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.dto.AppConfigDTO;
import com.albatha.paymentservice.dto.ApplicationDTO;
import com.albatha.paymentservice.dto.OrganizationDTO;

import java.util.UUID;

public class ApplicationDTOBuilder {
    UUID id = UUID.randomUUID();
    String name = "APPLICATION NAME";
    UUID organizationId = UUID.randomUUID();
    OrganizationDTO organization = null;
    AppConfigDTO appConfig = null;

    public ApplicationDTO build() {
        ApplicationDTO applicationDTO = new ApplicationDTO();
        applicationDTO.setId(id);
        applicationDTO.setName(name);
        applicationDTO.setOrganizationId(organizationId);
        applicationDTO.setOrganization(organization);
        applicationDTO.setAppConfig(appConfig);
        return applicationDTO;
    }

    public ApplicationDTOBuilder appConfig(AppConfigDTO appConfig) {
        this.appConfig = appConfig;
        return this;
    }

    public ApplicationDTOBuilder organization(OrganizationDTO organizationDTO) {
        this.organization = organizationDTO;
        return this;
    }
}

