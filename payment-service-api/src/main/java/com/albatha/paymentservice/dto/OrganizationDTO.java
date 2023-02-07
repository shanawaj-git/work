package com.albatha.paymentservice.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class OrganizationDTO {
    private UUID id;
    private String name;
}
