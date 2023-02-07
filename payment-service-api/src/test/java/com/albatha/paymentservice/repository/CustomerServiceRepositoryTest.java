package com.albatha.paymentservice.repository;

import com.albatha.paymentservice.builder.CustomerBuilder;
import com.albatha.paymentservice.model.Customer;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.TestPropertySource;
import reactor.test.StepVerifier;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DataMongoTest
@TestPropertySource(properties = "spring.mongodb.embedded.version=3.5.5")
  class CustomerServiceRepositoryTest {

    @Autowired
    CustomerRepository customerRepository;

    Customer customerData;

    @Nested
    class CustomerCRUDTest{

        @Test
        void shouldSaveCustomer(){
            customerData = new CustomerBuilder().build();
            var customerMethod = customerRepository.save(customerData);

            StepVerifier.create(customerMethod).assertNext(customerMethod1 -> {
                assertEquals(customerMethod1.getApplicationCustomerId(), customerData.getApplicationCustomerId());
                assertEquals(customerMethod1.getProviderCustomerId(), customerData.getProviderCustomerId());
                assertEquals(customerMethod1, customerData);
            });
        }

        @Test
        void shouldFindCustomerById(){
            customerData = new CustomerBuilder().build();
            var customerMethod = customerRepository.save(customerData);
            var findCustomer = customerRepository.findById(customerData.getId());

            StepVerifier.create(findCustomer).assertNext(customerMethod1 -> {
                assertEquals(customerMethod1.getApplicationCustomerId(), customerData.getApplicationCustomerId());
                assertEquals(customerMethod1.getProviderCustomerId(), customerData.getProviderCustomerId());
                assertEquals(customerMethod1, customerData);
            });
        }
    }


}
