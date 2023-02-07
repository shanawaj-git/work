package com.albatha.paymentservice.builder;

import com.albatha.paymentservice.defaultData.DefaultCustomer;
import com.albatha.paymentservice.dto.ApplicationDTO;
import com.albatha.paymentservice.dto.CustomerDTO;
import com.albatha.paymentservice.dto.OrganizationDTO;
import com.albatha.paymentservice.model.CustomerName;
import com.albatha.paymentservice.model.PaymentMethod;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class CustomerDTOBuilder {
    UUID id = UUID.randomUUID();
    Object providerMetaData;
    CustomerName name = new CustomerNameBuilder().build();
    String email = DefaultCustomer.email;
    String phone = DefaultCustomer.phone;
    String applicationCustomerId = DefaultCustomer.applicationCustomerId;
    String providerCustomerId;
    OrganizationDTO organization;
    ApplicationDTO application;
    List<PaymentMethod> paymentMethods;
    LocalDateTime createdAt;

    public CustomerDTO build() {
        return new CustomerDTO(name, email, phone, applicationCustomerId, providerCustomerId, providerMetaData, application);
    }

    public CustomerDTOBuilder organization(OrganizationDTO organization) {
        this.organization = organization;
        return this;
    }

    public CustomerDTOBuilder application(ApplicationDTO applicationDTO) {
        this.application = applicationDTO;
        return this;
    }

    public CustomerDTOBuilder applicationCustomerId(String applicationCustomerId) {
        this.applicationCustomerId = applicationCustomerId;
        return this;
    }
}
