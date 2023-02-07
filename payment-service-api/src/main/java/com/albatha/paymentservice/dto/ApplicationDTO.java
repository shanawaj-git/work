package com.albatha.paymentservice.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class ApplicationDTO {
    private UUID id;
    private String name;
    private UUID organizationId;
    private OrganizationDTO organization;
    private AppConfigDTO appConfig;
}
