package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.defaultData.DefaultCustomer;
import com.albatha.paymentservice.model.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class CustomerBuilder {

    UUID id = UUID.randomUUID();
    CustomerName name = new CustomerNameBuilder().build();
    String email = DefaultCustomer.email;
    String phone = DefaultCustomer.phone;
    String applicationCustomerId = DefaultCustomer.applicationCustomerId;
    String providerCustomerId = DefaultCustomer.providerCustomerId;
    LocalDateTime createdAt = LocalDateTime.now();
    List paymentMethod = new ArrayList<>();
    UUID organizationId = UUID.randomUUID();
    Organization organization = new OrganizationBuilder().build();
    AppConfig appConfig = new AppConfigBuilder().build();
    UUID applicationId = UUID.randomUUID();
    Application application = new ApplicationBuilder().build();

    public Customer build() {
        return new Customer(id, name, email, phone, organizationId, organization, applicationId, application, "EscribeId", providerCustomerId, paymentMethod, null, createdAt);
    }

    public CustomerBuilder organization(Organization organization) {
        this.organization = organization;
        return this;
    }

    public CustomerBuilder application(Application application) {
        this.application = application;
        return this;
    }

    public CustomerBuilder appConfig(AppConfig appConfig) {
        this.appConfig = appConfig;
        return this;
    }

    public CustomerBuilder paymentMethod(List<PaymentMethod> paymentMethods) {
        this.paymentMethod.addAll(paymentMethods);
        return this;
    }
}
