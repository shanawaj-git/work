package com.albatha.paymentservice.service;

import com.albatha.paymentservice.builder.CustomerBuilder;
import com.albatha.paymentservice.builder.CustomerDTOBuilder;
import com.albatha.paymentservice.dto.CustomerDTO;
import com.albatha.paymentservice.model.Customer;
import com.albatha.paymentservice.repository.CustomerRepository;
import com.albatha.paymentservice.service.impl.CustomerMethodServiceImpl;
import com.albatha.paymentservice.service.provider.CustomerMethodProviderData;
import com.albatha.paymentservice.service.provider.CustomerMethodProviderService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import reactor.core.publisher.Mono;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@DirtiesContext
  class CustomerServiceTest {

    @MockBean
    private CustomerRepository customerRepository;

    @MockBean
    private CustomerMethodProviderService customerMethodProviderService;

    @InjectMocks
    private CustomerMethodServiceImpl customerMethodServiceImpl;

    @Test
    void addCustomerMethod(){
        Customer customer = new CustomerBuilder().build();
        CustomerDTO newCustomerDto = new CustomerDTOBuilder().build();

        when(customerRepository.save(customer))
                .thenReturn(Mono.just(customer));

        when(customerMethodProviderService.saveCustomerOnProvider(newCustomerDto))
                .thenReturn(Mono.just(new CustomerMethodProviderData()));

       var serviceMethod = customerMethodProviderService.saveCustomerOnProvider(newCustomerDto);
        serviceMethod.flatMap(customerMethodProviderData -> {
            assert customerMethodProviderData.getProviderCustomerId() != null;
            return null;
        });

    }
}
