package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.defaultData.DefaultOrganization;
import com.albatha.paymentservice.dto.OrganizationDTO;

import java.util.UUID;

public class OrganizationDTOBuilder {
    UUID id = DefaultOrganization.id;
    String name = DefaultOrganization.name;

    public OrganizationDTO build() {
        OrganizationDTO organizationDto = new OrganizationDTO();
        organizationDto.setId(id);
        organizationDto.setName(name);
        return organizationDto;
    }
}
