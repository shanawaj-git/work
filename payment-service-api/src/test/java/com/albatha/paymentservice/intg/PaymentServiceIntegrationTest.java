package com.albatha.paymentservice.intg;

import com.albatha.paymentservice.builder.*;
import com.albatha.paymentservice.dto.BillingDetailsDTO;
import com.albatha.paymentservice.dto.input.PaymentMethodInputDTO;
import com.albatha.paymentservice.dto.output.PaymentMethodDeleteOutputDTO;
import com.albatha.paymentservice.dto.output.PaymentMethodOutputDTO;
import com.albatha.paymentservice.kafka.producer.EventProducer;
import com.albatha.paymentservice.model.AppConfig;
import com.albatha.paymentservice.model.Application;
import com.albatha.paymentservice.model.Customer;
import com.albatha.paymentservice.model.PaymentMethod;
import com.albatha.paymentservice.repository.ApplicationRepository;
import com.albatha.paymentservice.repository.CustomerRepository;
import com.albatha.paymentservice.service.provider.PaymentMethodProviderData;
import com.albatha.paymentservice.service.provider.PaymentMethodProviderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;
import java.time.Duration;
import java.util.List;
import java.util.UUID;
import static com.albatha.paymentservice.util.CustomAssertion.shouldBeSame;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        properties = "spring.main.web-application-type=reactive")
@AutoConfigureWebTestClient

class PaymentServiceIntegrationTest {
    private static final String CUST_NOT_FOUND_EXCEPTION_MDG = "{\"message\":\"Customer not found\"}";
    private static final String INVALID_INOUT_EXCEPTION_MDG = "{\"message\":\"There is no payment method associated with the customer provided\"}";
    static String DELETE_PAYMENT_METHOD_URL = "/api/v1/customers/{customerId}/paymentmethods/{paymentId}";
    static String UPDATE_PAYMENT_METHOD_URL = "/api/v1/customers/{customerId}/paymentmethods/{paymentId}";
    static String ADD_PAYMENT_METHOD_URL = "/api/v1/customers/{customerId}/paymentmethods";
    static String GET_PAYMENT_METHODS_URL = "/api/v1/customers";
    Customer customer;
    PaymentMethodInputDTO paymentMethodInputDTO;
    @Autowired
    WebTestClient webTestClient;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    ApplicationRepository applicationRepository;
    @MockBean
    EventProducer eventProducer;
    @MockBean
    PaymentMethodProviderService paymentMethodProviderService;
    String providerPaymentMethodId;

    @Nested
    class CreatePaymentMethodTest {
        @BeforeEach
        void setUp() {

            webTestClient = webTestClient.mutate()
                    .responseTimeout(Duration.ofMillis(30000))
                    .build();
            BillingDetailsDTO billingDetailsDTO = new BillingDetailsDTOBuilder()
                    .address(new AddressDTOBuilder().build())
                    .build();
            paymentMethodInputDTO = new PaymentMethodInputDTOBuilder()
                    .billingDetails(billingDetailsDTO)
                    .build();
            customer = new CustomerBuilder().build();
            AppConfig appConfig = new AppConfigBuilder()
                    .providerConfig(new StripeConfigBuilder().build())
                    .build();
            Application application = applicationRepository.save(new ApplicationBuilder()
                            .appConfig(appConfig)
                            .build())
                    .block();
            customer.setApplicationId(application.getId());
            customer = customerRepository.save(customer).block();
        }

        @Test
        void shouldAddPaymentMethodTest() {
            com.stripe.model.PaymentMethod paymentMethod = new StripePaymentMethodBuilder().build();
            when(paymentMethodProviderService.addPaymentMethod(any(), any()))
                    .thenReturn(Mono.just(new PaymentMethodProviderData(providerPaymentMethodId, paymentMethod)));

            webTestClient
                    .post()
                    .uri(ADD_PAYMENT_METHOD_URL, customer.getId())
                    .bodyValue(paymentMethodInputDTO)
                    .exchange()
                    .expectStatus()
                    .isCreated()
                    .expectBody(PaymentMethodOutputDTO.class)
                    .consumeWith(paymentMethodOutputDTOEntityExchangeResult -> {
                        PaymentMethodOutputDTO savedPaymentMethod = paymentMethodOutputDTOEntityExchangeResult.getResponseBody();
                        shouldBeSame(savedPaymentMethod, paymentMethodInputDTO);
                    });
        }

        @Test
        void shouldThrowExceptionWhenCustomerNorFound() {
            webTestClient
                    .post()
                    .uri(ADD_PAYMENT_METHOD_URL, UUID.randomUUID())
                    .bodyValue(paymentMethodInputDTO)
                    .accept(MediaType.ALL)
                    .exchange()
                    .expectStatus()
                    .is4xxClientError()
                    .expectBody(String.class)
                    .consumeWith(paymentMethodOutputDTOEntityExchangeResult -> {
                        var exception = paymentMethodOutputDTOEntityExchangeResult.getResponseBody();
                        shouldBeSame("{\"message\":\"Customer not found\"}", exception);
                    });
        }
    }

    @Nested
    class DeletePaymentMethodTest {
        @BeforeEach
        void setUp() {

            webTestClient = webTestClient.mutate()
                    .responseTimeout(Duration.ofMillis(30000))
                    .build();

            PaymentMethod paymentMethod = new PaymentMethodBuilder().build();
            customer = new CustomerBuilder()
                    .paymentMethod(List.of(paymentMethod))
                    .build();
            AppConfig appConfig = new AppConfigBuilder()
                    .providerConfig(new StripeConfigBuilder().build())
                    .build();
            Application application = applicationRepository.save(new ApplicationBuilder()
                            .appConfig(appConfig)
                            .build())
                    .block();
            customer.setApplicationId(application.getId());
            customer = customerRepository.save(customer).block();

            providerPaymentMethodId = customer.getPaymentMethods().get(0).getId().toString();
        }

        @Test
        void shouldDeletePaymentMethodTest() {
            when(paymentMethodProviderService.deletePaymentMethod(any(), any()))
                    .thenReturn(Mono.just(new PaymentMethodProviderData(providerPaymentMethodId, null)));

            webTestClient
                    .delete()
                    .uri(DELETE_PAYMENT_METHOD_URL, customer.getId(), providerPaymentMethodId)
                    .exchange()
                    .expectStatus()
                    .isOk()
                    .expectBody(PaymentMethodDeleteOutputDTO.class)
                    .consumeWith(paymentMethodDeleteOutputDTOEntityExchangeResult -> {
                        PaymentMethodDeleteOutputDTO deleteOutputDTO = paymentMethodDeleteOutputDTOEntityExchangeResult.getResponseBody();
                        shouldBeSame(deleteOutputDTO);
                    });
        }

        @Test
        void shouldThrowCustomerNotFoundExceptionTest() {
            webTestClient
                    .delete()
                    .uri(DELETE_PAYMENT_METHOD_URL, UUID.randomUUID().toString(), providerPaymentMethodId)
                    .exchange()
                    .expectStatus()
                    .is4xxClientError()
                    .expectBody(String.class)
                    .consumeWith(paymentMethodOutputDTOEntityExchangeResult -> {
                        var exception = paymentMethodOutputDTOEntityExchangeResult.getResponseBody();
                        shouldBeSame(CUST_NOT_FOUND_EXCEPTION_MDG, exception);
                    });
        }

        @Test
        void shouldThrowInvalidInputExceptionTest() {
            webTestClient
                    .delete()
                    .uri(DELETE_PAYMENT_METHOD_URL, customer.getId(), UUID.randomUUID().toString())
                    .exchange()
                    .expectStatus()
                    .is4xxClientError()
                    .expectBody(String.class)
                    .consumeWith(paymentMethodOutputDTOEntityExchangeResult -> {
                        var exception = paymentMethodOutputDTOEntityExchangeResult.getResponseBody();
                        shouldBeSame(INVALID_INOUT_EXCEPTION_MDG, exception);
                    });
            }
    }
    @Nested
    class UpdatePaymentMethodTest{
        @BeforeEach
        void setUp() {

            webTestClient = webTestClient.mutate()
                    .responseTimeout(Duration.ofMillis(30000))
                    .build();
            BillingDetailsDTO billingDetailsDTO = new BillingDetailsDTOBuilder()
                    .address(new AddressDTOBuilder().build())
                    .build();
            paymentMethodInputDTO = new PaymentMethodInputDTOBuilder()
                    .billingDetails(billingDetailsDTO)
                    .build();
            PaymentMethod paymentMethod = new PaymentMethodBuilder().build();
            customer = new CustomerBuilder()
                    .paymentMethod(List.of(paymentMethod))
                    .build();
            AppConfig appConfig = new AppConfigBuilder()
                    .providerConfig(new StripeConfigBuilder().build())
                    .build();
            Application application = applicationRepository.save(new ApplicationBuilder()
                            .appConfig(appConfig)
                            .build())
                            .block();
            customer.setApplicationId(application.getId());
            customer = customerRepository.save(customer).block();
            providerPaymentMethodId = customer.getPaymentMethods().get(0).getId().toString();
        }
        @Test
        void shouldUpdatePaymentMethodTest() {
            when(paymentMethodProviderService.updatePaymentMethod(any(), any(),any()))
                    .thenReturn(Mono.just(new PaymentMethodProviderData(providerPaymentMethodId, new StripePaymentMethodBuilder().build())));

            webTestClient
                    .put()
                    .uri(UPDATE_PAYMENT_METHOD_URL, customer.getId(), providerPaymentMethodId)
                    .bodyValue(paymentMethodInputDTO)
                    .exchange()
                    .expectStatus()
                    .isOk()
                    .expectBody(PaymentMethodOutputDTO.class)
                    .consumeWith(paymentMethodOutputDTOEntityExchangeResult -> {
                        PaymentMethodOutputDTO updateOutputDTO = paymentMethodOutputDTOEntityExchangeResult.getResponseBody();
                        shouldBeSame(updateOutputDTO,paymentMethodInputDTO);
                    });
        }
        @Test
        void shouldThrowCustomerNotFoundExceptionTest() {
            webTestClient
                    .put()
                    .uri(UPDATE_PAYMENT_METHOD_URL, UUID.randomUUID(), providerPaymentMethodId)
                    .bodyValue(paymentMethodInputDTO)
                    .exchange()
                    .expectStatus()
                    .is4xxClientError()
                    .expectBody(String.class)
                    .consumeWith(paymentMethodOutputDTOEntityExchangeResult -> {
                        var exception = paymentMethodOutputDTOEntityExchangeResult.getResponseBody();
                        shouldBeSame(CUST_NOT_FOUND_EXCEPTION_MDG, exception);
                    });
        }
        @Test
        void shouldThrowInvalidInputExceptionTest() {
            webTestClient
                    .put()
                    .uri(UPDATE_PAYMENT_METHOD_URL, customer.getId(), UUID.randomUUID())
                    .bodyValue(paymentMethodInputDTO)
                    .exchange()
                    .expectStatus()
                    .is4xxClientError()
                    .expectBody(String.class)
                    .consumeWith(paymentMethodOutputDTOEntityExchangeResult -> {
                        var exception = paymentMethodOutputDTOEntityExchangeResult.getResponseBody();
                        shouldBeSame(INVALID_INOUT_EXCEPTION_MDG, exception);
                    });
        }
    }

    @Nested
    class ListPaymentIntegrationTest {

        @BeforeEach
        void setUp() {
            webTestClient = webTestClient.mutate()
                    .responseTimeout(Duration.ofMillis(30000))
                    .build();
            BillingDetailsDTO billingDetailsDTO = new BillingDetailsDTOBuilder()
                    .address(new AddressDTOBuilder().build())
                    .build();
            paymentMethodInputDTO = new PaymentMethodInputDTOBuilder()
                    .billingDetails(billingDetailsDTO)
                    .build();
            customer = new CustomerBuilder().build();
            AppConfig appConfig = new AppConfigBuilder()
                    .providerConfig(new StripeConfigBuilder().build())
                    .build();
            Application application = applicationRepository.save(new ApplicationBuilder()
                            .appConfig(appConfig)
                            .build())
                    .block();

            PaymentMethod paymentMethod = new PaymentMethodBuilder().build();
            paymentMethod.setProviderPaymentMethodId("pm_1LSJuMI3Fb4xUkyyfRbT258L");
            customer.setApplicationId(application.getId());
            customer.getPaymentMethods().add(paymentMethod);
            customer = customerRepository.save(customer).block();

        }

        @Test
        void shouldRetrieveAllPaymentsMethodsOfCustomer() {
            System.out.println(customer.getId());
            System.out.println(customer.getPaymentMethods().get(0).getId());
            webTestClient
                    .get()
                    .uri(GET_PAYMENT_METHODS_URL + "/{customerId}/paymentmethods/{paymentMethodId}", customer.getId(), customer.getPaymentMethods().get(0).getId())
                    .accept(MediaType.ALL)
                    .exchange()
                    .expectStatus()
                    .is2xxSuccessful()
                    .expectBody(PaymentMethodOutputDTO.class)
                    .consumeWith(stringEntityExchangeResult -> {
                        var response = stringEntityExchangeResult.getResponseBody();
                        System.out.println(response);
                    });
        }

        @Test
        void shoudGiveCustomerNotFoundExceptionOnWrongCustomerId() {
            webTestClient
                    .get()
                    .uri(GET_PAYMENT_METHODS_URL + "/{customerId}/paymentmethods/{paymentMethodId}", UUID.randomUUID(), customer.getPaymentMethods().get(0).getId())
                    .accept(MediaType.ALL)
                    .exchange()
                    .expectStatus()
                    .isNotFound()
                    .expectBody(String.class)
                    .consumeWith(paymentMethodOutputDTOEntityExchangeResult -> {
                        var exception = paymentMethodOutputDTOEntityExchangeResult.getResponseBody();
                        shouldBeSame("{\"message\":\"Customer not found\"}", exception);
                    });
        }

        @Test
        void shouldGivePaymentNotFoundExceptionOnWrongPaymentId() {
            webTestClient
                    .get()
                    .uri(GET_PAYMENT_METHODS_URL + "/{customerId}/paymentmethods/{paymentMethodId}", customer.getId(), UUID.randomUUID())
                    .accept(MediaType.ALL)
                    .exchange()
                    .expectStatus()
                    .isNotFound()
                    .expectBody(String.class)
                    .consumeWith(paymentMethodOutputDTOEntityExchangeResult -> {
                        var exception = paymentMethodOutputDTOEntityExchangeResult.getResponseBody();
                        shouldBeSame("{\"message\":\"No payment methods found\"}", exception);
                    });
        }

        @Test
        void shouldRetrievePaymentMethodWithPaymentId() {
            webTestClient
                    .get()
                    .uri(GET_PAYMENT_METHODS_URL + "/{customerId}/paymentmethods/{paymentMethodId}", customer.getId(), customer.getPaymentMethods().get(0).getId())
                    .accept(MediaType.ALL)
                    .exchange()
                    .expectStatus()
                    .is2xxSuccessful();

        }
    }
}
