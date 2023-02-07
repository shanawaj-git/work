package com.albatha.paymentservice.model;
import com.albatha.paymentservice.dto.OrganizationDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "organization")
public class Organization {
    @Id
    private UUID id = UUID.randomUUID();
    private String name;

    public Organization(OrganizationDTO organizationDTO) {
        this.name = organizationDTO.getName();
    }
}

