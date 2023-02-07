package com.albatha.paymentservice.model;
import com.albatha.paymentservice.dto.AppConfigDTO;
import com.albatha.paymentservice.dto.ApplicationDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "application")
@TypeAlias("application")
public class Application {

    @Id
    private UUID id = UUID.randomUUID();
    private String name;

    private UUID organizationId;
    private Organization organization;
    private AppConfig appConfig;

    public Application(ApplicationDTO applicationDTO, AppConfigDTO appConfigDTO) {
        this.name = applicationDTO.getName();
        this.organizationId = applicationDTO.getOrganizationId();
        this.appConfig = new AppConfig(appConfigDTO);

    }
}
