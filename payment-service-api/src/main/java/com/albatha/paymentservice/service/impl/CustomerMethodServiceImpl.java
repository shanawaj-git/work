package com.albatha.paymentservice.service.impl;

import com.albatha.paymentservice.constants.ErrorMessage;
import com.albatha.paymentservice.dto.CustomerDTO;
import com.albatha.paymentservice.model.Application;
import com.albatha.paymentservice.model.Customer;
import com.albatha.paymentservice.model.Organization;
import com.albatha.paymentservice.repository.ApplicationRepository;
import com.albatha.paymentservice.repository.CustomerRepository;
import com.albatha.paymentservice.repository.OrganizationRepository;
import com.albatha.paymentservice.service.CustomerMethodService;
import com.albatha.paymentservice.service.provider.CustomerMethodProviderData;
import com.albatha.paymentservice.service.provider.CustomerMethodProviderService;
import com.albatha.paymentservice.service.provider.exception.PaymentProviderServiceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;


@Service
@Slf4j
public class CustomerMethodServiceImpl implements CustomerMethodService {
    private final CustomerMethodProviderService customerMethodProviderService;
    private final CustomerRepository customerRepository;
    private final OrganizationRepository organizationRepository;
    private final ApplicationRepository applicationRepository;


    public CustomerMethodServiceImpl(CustomerMethodProviderService customerMethodProviderService, CustomerRepository customerRepository, OrganizationRepository organizationRepository, ApplicationRepository applicationRepository) {
        this.customerMethodProviderService = customerMethodProviderService;
        this.customerRepository = customerRepository;
        this.organizationRepository = organizationRepository;
        this.applicationRepository = applicationRepository;
    }

    @Override
    public Mono<Customer> addCustomer(CustomerDTO customerDTO) {
        log.info("Calling CustomerMethodServiceImpl.addCustomerMethod");

        return addCustomerInProvider(customerDTO)
                .switchIfEmpty(Mono.error(new PaymentProviderServiceException(ErrorMessage.CREATE_CUSTOMER_EXCEPTION)))
                .flatMap(customerMethodProviderData -> {
            customerDTO.setProviderCustomerId(customerMethodProviderData.getProviderCustomerId());
            return customerSavePipe(customerDTO);
        });
    }

    private Mono<CustomerMethodProviderData> addCustomerInProvider(CustomerDTO customerDTO) {
        log.info("Calling addCustomerMethodInProvider");
        return customerMethodProviderService.saveCustomerOnProvider(customerDTO);
    }

    private Mono<Organization> organizationPreCheck(CustomerDTO customerDTO) {
        log.info("Calling CustomerMethodServiceImpl.organizationPreCheck");
        return organizationRepository.findByName(customerDTO.getApplication().getOrganization().getName())
                .switchIfEmpty(organizationRepository.save(new Organization(customerDTO.getApplication().getOrganization())))
                .doOnNext((organization) -> {
                    customerDTO.getApplication().getOrganization().setId(organization.getId());
                    customerDTO.getApplication().setOrganizationId(organization.getId());
                });

    }

    private Mono<Application> applicationPreCheck(CustomerDTO customerDTO) {
        log.info("Calling CustomerMethodServiceImpl.applicationPreCheck");
        return applicationRepository.findByName(customerDTO.getApplication().getName())
                .switchIfEmpty(applicationRepository.save(new
                        Application(customerDTO.getApplication(), customerDTO.getApplication().getAppConfig())))
                .doOnNext((application -> {
                    customerDTO.getApplication().setId(application.getId());
                }));
    }

    private Mono<Customer> saveCustomer(CustomerDTO customerDTO) {
        log.info("Calling CustomerMethodServiceImpl.saveCustomer");
        return customerRepository.save(new Customer(customerDTO));
    }

    private Mono<Customer> customerSavePipe(CustomerDTO customerDTO) {
        return organizationPreCheck(customerDTO)
                .flatMap(organization -> applicationPreCheck(customerDTO))
                .flatMap(application -> saveCustomer(customerDTO));
    }

}
