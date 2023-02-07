package com.albatha.paymentservice.model;

import com.albatha.paymentservice.dto.CustomerDTO;
import com.albatha.paymentservice.validation.ValidEmail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "customer")
@TypeAlias("customer")
public class Customer {

    @Id
    private UUID id = UUID.randomUUID();
    private CustomerName name;

    @ValidEmail
    private String email;

    private String phone;

    private UUID organizationId;
    private Organization organization;

    private UUID applicationId;
    private Application application;
    private String applicationCustomerId;
    private String providerCustomerId;
    private List<PaymentMethod> paymentMethods = new ArrayList<>();
    private Object providerMetaData;
    private LocalDateTime createdAt;

    public Customer(CustomerDTO customerDTO) {
        this.name = customerDTO.getName();
        this.email = customerDTO.getEmail();
        this.phone = customerDTO.getPhone();
        this.providerCustomerId = customerDTO.getProviderCustomerId();
        this.applicationId = customerDTO.getApplication().getId();
        this.applicationCustomerId = customerDTO.getApplicationCustomerId();
        this.organizationId = customerDTO.getApplication().getOrganizationId();
        this.providerMetaData = customerDTO.getProviderMetadata();
    }
}
