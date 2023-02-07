package com.albatha.paymentservice.intg;


import com.albatha.paymentservice.builder.*;
import com.albatha.paymentservice.dto.AppConfigDTO;
import com.albatha.paymentservice.dto.ApplicationDTO;
import com.albatha.paymentservice.dto.CustomerDTO;
import com.albatha.paymentservice.dto.OrganizationDTO;
import com.albatha.paymentservice.model.Customer;
import com.albatha.paymentservice.model.PaymentMethodType;
import com.albatha.paymentservice.model.PaymentProvider;
import com.albatha.paymentservice.repository.CustomerRepository;
import com.albatha.paymentservice.service.CustomerMethodService;
import com.albatha.paymentservice.service.provider.CustomerMethodProviderData;
import com.albatha.paymentservice.service.provider.CustomerMethodProviderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.List;

import static com.albatha.paymentservice.util.CustomAssertion.shouldBeSame;
import static org.mockito.ArgumentMatchers.any;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, properties = "spring.main.web-application-type=reactive")
@AutoConfigureWebTestClient
class CustomerIntegrationTest {

    static String CUSTOMER_URL = "/api/v1/customers";
    @Autowired
    WebTestClient webTestClient;

    CustomerDTO customerData;

    @MockBean
    CustomerMethodService customerMethodService;
    @MockBean
    CustomerMethodProviderService customerMethodProviderService;

    @MockBean
    CustomerRepository customerRepository;


    @Nested
    class AddCustomerTest {

        @BeforeEach
        void setUp() {
            webTestClient = webTestClient.mutate()
                    .responseTimeout(Duration.ofMillis(30000))
                    .build();

            OrganizationDTO organizationDTO = new OrganizationDTOBuilder().build();

            AppConfigDTO appConfig = new AppConfigDTOBuilder()
                    .paymentMethodTypes(List.of(PaymentMethodType.CARD))
                    .providerConfig(new StripeConfigBuilder().build())
                    .paymentProvider(PaymentProvider.STRIPE)
                    .build();

            ApplicationDTO applicationDTO = new ApplicationDTOBuilder()
                    .appConfig(appConfig)
                    .organization(new OrganizationDTOBuilder().build())
                    .build();

            customerData = new CustomerDTOBuilder()
                    .organization(organizationDTO)
                    .application(applicationDTO)
                    .build();
        }

        @Test
        void shouldAddNewCustomerTest() {

            Mockito.when(customerRepository.save(any())).thenReturn(any());
            Mockito.when(customerMethodService.addCustomer(customerData)).thenReturn(Mono.just(new Customer(customerData)));
            Mockito.when(customerMethodProviderService.saveCustomerOnProvider(customerData))
                    .thenReturn(Mono.just(new CustomerMethodProviderData()));

            webTestClient
                    .post()
                    .uri(CUSTOMER_URL + "/create")
                    .bodyValue(customerData)
                    .accept(MediaType.ALL)
                    .exchange()
                    .expectStatus()
                    .isCreated()
                    .expectBody(Customer.class)
                    .consumeWith(customerDTOEntityExchangeResult -> {
                        Customer savedCustomer = customerDTOEntityExchangeResult.getResponseBody();
                        assert savedCustomer != null;
                        shouldBeSame(customerData, savedCustomer);
                    });

        }

        @Test
        void returnsBadRequestOnInvalidBody() {
            webTestClient
                    .post()
                    .uri(CUSTOMER_URL + "/create")
                    .accept(MediaType.ALL)
                    .bodyValue("bad request")
                    .exchange()
                    .expectStatus()
                    .is5xxServerError();
        }

        @Test
        void shouldValidateEmail() {
            customerData = new CustomerDTOBuilder().build();
            customerData.setEmail("test@.coe");

            webTestClient
                    .post()
                    .uri(CUSTOMER_URL + "/create")
                    .accept(MediaType.ALL)
                    .bodyValue(customerData)
                    .exchange()
                    .expectStatus()
                    .isBadRequest();
        }

    }
}
