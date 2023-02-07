package com.albatha.paymentservice.service;

import com.albatha.paymentservice.builder.*;
import com.albatha.paymentservice.constants.ErrorMessage;
import com.albatha.paymentservice.dto.BillingDetailsDTO;
import com.albatha.paymentservice.dto.input.PaymentMethodInputDTO;
import com.albatha.paymentservice.dto.output.PaymentMethodDeleteOutputDTO;
import com.albatha.paymentservice.dto.output.PaymentMethodOutputDTO;
import com.albatha.paymentservice.exception.CustomerNotFoundException;
import com.albatha.paymentservice.exception.InvalidInputDetailsException;
import com.albatha.paymentservice.exception.PaymentNotFoundException;
import com.albatha.paymentservice.kafka.producer.EventProducer;
import com.albatha.paymentservice.model.Customer;
import com.albatha.paymentservice.model.PaymentMethod;
import com.albatha.paymentservice.repository.CustomerRepository;
import com.albatha.paymentservice.service.impl.PaymentMethodServiceImpl;
import com.albatha.paymentservice.service.provider.PaymentMethodProviderData;
import com.albatha.paymentservice.service.provider.PaymentMethodProviderService;
import com.albatha.paymentservice.service.provider.exception.PaymentProviderServiceException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.modelmapper.ModelMapper;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.UUID;

import static com.albatha.paymentservice.util.CustomAssertion.shouldBeSame;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@DirtiesContext()
class PaymentServiceTest {
    private static final String CUST_NOT_FOUND_EXCEPTION_MDG = ErrorMessage.CUSTOMER_NOT_FOUND.message;
    private static final String INVALID_INOUT_EXCEPTION_MDG = ErrorMessage.INVALID_PAYMENT_METHOD.message;
    private final PaymentMethodProviderService paymentMethodProviderService = mock(PaymentMethodProviderService.class);
    private final CustomerRepository customerRepository = mock(CustomerRepository.class);
    private final ModelMapper modelMapper = mock(ModelMapper.class);
    private final EventProducer eventProducer = mock(EventProducer.class);
    private final PaymentMethodServiceImpl paymentMethodService = new PaymentMethodServiceImpl(paymentMethodProviderService,
            customerRepository,
            modelMapper,
            eventProducer);
    UUID paymentMethodId;
    Customer customer;
    PaymentMethodProviderData paymentMethodProviderData;
    PaymentMethod paymentMethod;
    PaymentMethodInputDTO paymentMethodInputDTO;
    PaymentMethodOutputDTO pmOutputDTO;

    @Nested
    class AddPaymentMethodTest {

        @BeforeEach
        void setUp() {
            customer = new CustomerBuilder().build();
            paymentMethodProviderData = new PaymentMethodProviderDataBuilder().build();
            paymentMethod = new PaymentMethodBuilder().build();
            BillingDetailsDTO billingDetailsDTO = new BillingDetailsDTOBuilder()
                    .address(new AddressDTOBuilder().build())
                    .build();
            paymentMethodInputDTO = new PaymentMethodInputDTOBuilder()
                    .billingDetails(billingDetailsDTO)
                    .build();
            pmOutputDTO = new PaymentMethodOutputDTOBuilder().build();
        }

        @Test
        void shouldAddPaymentMethodTest() {

            when(paymentMethodProviderService.addPaymentMethod(any(), any())).thenReturn(Mono.just(paymentMethodProviderData));
            when(customerRepository.getCustomerById(customer.getId())).thenReturn(Mono.just(customer));
            when(modelMapper.map(any(), any())).thenReturn(pmOutputDTO);
            when(customerRepository.save(any())).thenReturn(Mono.empty());
            PaymentMethodOutputDTO paymentMethodOutputDTO = paymentMethodService.addPaymentMethod(customer.getId(), paymentMethodInputDTO).block();
            shouldBeSame(paymentMethodOutputDTO, paymentMethodInputDTO);
        }

        @Test
        void shouldThrowCustomerNotFoundExceptionTest() {

            when(paymentMethodProviderService.addPaymentMethod(any(), any())).thenReturn(Mono.just(paymentMethodProviderData));
            when(customerRepository.getCustomerById(customer.getId())).thenReturn(Mono.empty());
            when(modelMapper.map(any(), any())).thenReturn(pmOutputDTO);
            Exception exception = Assertions.assertThrows(CustomerNotFoundException.class, () -> {
                paymentMethodService.addPaymentMethod(customer.getId(), paymentMethodInputDTO).block();
            });
            Assertions.assertEquals(CUST_NOT_FOUND_EXCEPTION_MDG, exception.getMessage());
        }

        @Test
        void shouldThrowPaymentProviderServiceExceptionTest() {

            when(paymentMethodProviderService.addPaymentMethod(any(), any())).thenReturn(Mono.error(new PaymentProviderServiceException(ErrorMessage.STRIPE_PAYMENT_TYPE_EXCEPTION)));
            when(customerRepository.getCustomerById(customer.getId())).thenReturn(Mono.just(customer));
            when(modelMapper.map(any(), any())).thenReturn(pmOutputDTO);
            Exception exception = Assertions.assertThrows(PaymentProviderServiceException.class, () -> {
                paymentMethodService.addPaymentMethod(customer.getId(), paymentMethodInputDTO).block();
            });
            exception.getMessage();
        }

    }

    @Nested
    class DeletePaymentMethodTest {
        @BeforeEach
        void setUp() {
            paymentMethod = new PaymentMethodBuilder().build();
            customer = new CustomerBuilder().paymentMethod(List.of(paymentMethod)).build();
            paymentMethodProviderData = new PaymentMethodProviderDataBuilder().build();

            BillingDetailsDTO billingDetailsDTO = new BillingDetailsDTOBuilder().address(new AddressDTOBuilder().build()).build();
            paymentMethodInputDTO = new PaymentMethodInputDTOBuilder().billingDetails(billingDetailsDTO).build();
            pmOutputDTO = new PaymentMethodOutputDTOBuilder().build();
            paymentMethodId = customer.getPaymentMethods().get(0).getId();
        }

        @Test
        void shouldDeletePaymentMethodTest() {
            mockServices();
            when(customerRepository.getCustomerById(customer.getId())).thenReturn(Mono.just(customer));
            PaymentMethodDeleteOutputDTO paymentMethodDeleteOutputDTO = paymentMethodService.deletePaymentMethod(customer.getId(), paymentMethodId).block();
            shouldBeSame(paymentMethodDeleteOutputDTO);
        }

        @Test
        void shouldThrowCustomerNotFoundExceptionServiceTest() {
            mockServices();
            when(customerRepository.getCustomerById(customer.getId())).thenReturn(Mono.empty());
            Exception exception = Assertions.assertThrows(CustomerNotFoundException.class, () -> {
                paymentMethodService.deletePaymentMethod(customer.getId(), paymentMethodId).block();
            });
            Assertions.assertEquals(CUST_NOT_FOUND_EXCEPTION_MDG, exception.getMessage());
        }

        @Test
        void shouldThrowInvalidInputExceptionServiceTest() {
            mockServices();
            when(customerRepository.getCustomerById(customer.getId())).thenReturn(Mono.just(customer));
            Exception exception = Assertions.assertThrows(InvalidInputDetailsException.class, () -> {
                paymentMethodService.deletePaymentMethod(customer.getId(), UUID.randomUUID()).block();
            });

            Assertions.assertEquals(INVALID_INOUT_EXCEPTION_MDG, exception.getMessage());
        }

        private void mockServices() {
            when(paymentMethodProviderService.deletePaymentMethod(any(), any())).thenReturn(Mono.just(paymentMethodProviderData));
            when(customerRepository.save(any())).thenReturn(Mono.empty());
        }
    }

    @Nested
    class RetrievePaymentMethodTest {

        @BeforeEach
        void setUp() {
            paymentMethod = new PaymentMethodBuilder().build();
            UUID randomPaymenthodId = UUID.randomUUID();
            paymentMethod.setId(randomPaymenthodId);
            customer = new CustomerBuilder().build();
            customer.getPaymentMethods().add(paymentMethod);
            paymentMethodProviderData = new PaymentMethodProviderDataBuilder().build();

            BillingDetailsDTO billingDetailsDTO = new BillingDetailsDTOBuilder().address(new AddressDTOBuilder().build()).build();
            paymentMethodInputDTO = new PaymentMethodInputDTOBuilder().billingDetails(billingDetailsDTO).build();
            pmOutputDTO = new PaymentMethodOutputDTOBuilder().build();
        }

        @Nested
        class getPaymentMethodsAttachedToCustomer {

            @Test
            void getSpecificPaymentMethodsAttachedToCustomer() {
                when(customerRepository.getCustomerById(customer.getId())).thenReturn(Mono.just(customer));
                when(modelMapper.map(any(), any())).thenReturn(pmOutputDTO);
                when(paymentMethodService.getPaymentMethodAttachedToCustomer(customer.getId(), paymentMethod.getId())).thenReturn(Mono.just(pmOutputDTO));
            }

            @Test
            void shouldGiveCustomerNotFoundException() {

                when(customerRepository.getCustomerById(customer.getId())).thenReturn(Mono.empty());
                when(modelMapper.map(any(), any())).thenReturn(pmOutputDTO);

                Exception exception = Assertions.assertThrows(CustomerNotFoundException.class, () -> {
                    paymentMethodService.getPaymentMethodAttachedToCustomer(customer.getId(), paymentMethod.getId()).block();
                });

                Assertions.assertEquals(ErrorMessage.CUSTOMER_NOT_FOUND.message, exception.getMessage());
            }

            @Test
            void shouldGivePaymentMethodNotFoundException() {
                when(customerRepository.getCustomerById(customer.getId())).thenReturn(Mono.just(customer));

                when(modelMapper.map(any(), any())).thenReturn(pmOutputDTO);

                Exception exception = Assertions.assertThrows(PaymentNotFoundException.class, () -> {
                    paymentMethodService.getPaymentMethodAttachedToCustomer(customer.getId(), UUID.randomUUID()).block();
                });

                Assertions.assertEquals(ErrorMessage.PAYMENT_NOT_FOUND.message, exception.getMessage());
            }
        }

        @Nested
        class getAllPaymentMethodsAttachedToCustomer {

            @Test
            void getSpecificPaymentMethodsAttachedToCustomer() {
                when(customerRepository.getCustomerById(customer.getId())).thenReturn(Mono.just(customer));
                when(modelMapper.map(any(), any())).thenReturn(pmOutputDTO);
                when(paymentMethodService.getPaymentMethodAttachedToCustomer(customer.getId(), paymentMethod.getId())).thenReturn(Mono.just(pmOutputDTO));
            }

            @Test
            void shouldGivePaymentExceptionWhenNoPaymentsFound(){
                customer = new CustomerBuilder().build();
                pmOutputDTO = new PaymentMethodOutputDTOBuilder().build();

                when(customerRepository.getCustomerById(customer.getId())).thenReturn(Mono.just(customer));
                when(modelMapper.map(any(), any())).thenReturn(pmOutputDTO);

                Exception exception = Assertions.assertThrows(PaymentNotFoundException.class, () -> {
                    paymentMethodService.getAllPaymentMethodsAttachedToCustomer(customer.getId()).blockFirst();
                });

                Assertions.assertEquals(ErrorMessage.PAYMENT_NOT_FOUND.message, exception.getMessage());
            }

            @Test
            void shouldGiveCustomerNotFoundException() {

                when(customerRepository.getCustomerById(customer.getId())).thenReturn(Mono.empty());
                when(modelMapper.map(any(), any())).thenReturn(pmOutputDTO);

                Exception exception = Assertions.assertThrows(CustomerNotFoundException.class, () -> {
                    paymentMethodService.getAllPaymentMethodsAttachedToCustomer(customer.getId()).blockFirst();
                });

                Assertions.assertEquals(ErrorMessage.CUSTOMER_NOT_FOUND.message, exception.getMessage());
            }

            @Test
            void shouldGivePaymentMethodNotFoundException() {
                customer = new CustomerBuilder().build();
                pmOutputDTO = new PaymentMethodOutputDTOBuilder().build();

                when(customerRepository.getCustomerById(customer.getId())).thenReturn(Mono.just(customer));
                when(modelMapper.map(any(), any())).thenReturn(pmOutputDTO);

                Exception exception = Assertions.assertThrows(PaymentNotFoundException.class, () -> {
                    paymentMethodService.getAllPaymentMethodsAttachedToCustomer(customer.getId()).blockFirst();
                });

                Assertions.assertEquals(ErrorMessage.PAYMENT_NOT_FOUND.message, exception.getMessage());
            }

        }
    }
    @Nested
    class UpdatePaymentMethodTest
    {
        @BeforeEach
        void setUp() {
            paymentMethod = new PaymentMethodBuilder().build();
            customer = new CustomerBuilder()
                    .paymentMethod(List.of(paymentMethod))
                    .build();
            paymentMethodProviderData = new PaymentMethodProviderDataBuilder().build();

            BillingDetailsDTO billingDetailsDTO = new BillingDetailsDTOBuilder()
                    .address(new AddressDTOBuilder().build())
                    .build();
            paymentMethodInputDTO = new PaymentMethodInputDTOBuilder()
                    .billingDetails(billingDetailsDTO)
                    .build();
            pmOutputDTO = new PaymentMethodOutputDTOBuilder().build();
            paymentMethodId = customer.getPaymentMethods().get(0).getId();
        }

        @Test
        void shouldUpdatePaymentMethodTest() {
            when(customerRepository.getCustomerById(customer.getId())).thenReturn(Mono.just(customer));
            when(modelMapper.map(any(), any())).thenReturn(pmOutputDTO);
            when(customerRepository.save(any())).thenReturn(Mono.empty());
            when(paymentMethodProviderService.updatePaymentMethod(any(), any(), any())).thenReturn(Mono.just(paymentMethodProviderData));
            PaymentMethodOutputDTO paymentMethodOutputDTO = paymentMethodService.updatePaymentMethod(customer.getId(), paymentMethodId, paymentMethodInputDTO).block();
            shouldBeSame(paymentMethodOutputDTO, paymentMethodInputDTO);
        }

        @Test
        void shouldThrowCustomerNotFoundExceptionTest() {

            when(paymentMethodProviderService.updatePaymentMethod(any(), any(), any())).thenReturn(Mono.just(paymentMethodProviderData));
            when(customerRepository.getCustomerById(customer.getId())).thenReturn(Mono.empty());
            when(modelMapper.map(any(), any())).thenReturn(pmOutputDTO);
            Exception exception = Assertions.assertThrows(CustomerNotFoundException.class, () -> {
                paymentMethodService.updatePaymentMethod(customer.getId(), paymentMethodId,paymentMethodInputDTO).block();
            });
            Assertions.assertEquals(CUST_NOT_FOUND_EXCEPTION_MDG, exception.getMessage());
        }

        @Test
        void shouldThrowPaymentProviderServiceExceptionTest() {

            when(paymentMethodProviderService.updatePaymentMethod(any(), any(), any())).thenReturn(Mono.error(new PaymentProviderServiceException(ErrorMessage.STRIPE_PAYMENT_TYPE_EXCEPTION)));
            when(customerRepository.getCustomerById(customer.getId())).thenReturn(Mono.just(customer));
            when(modelMapper.map(any(), any())).thenReturn(pmOutputDTO);
            Exception exception = Assertions.assertThrows(PaymentProviderServiceException.class, () -> {
                paymentMethodService.updatePaymentMethod(customer.getId(),paymentMethodId, paymentMethodInputDTO).block();
            });
            exception.getMessage();
        }
    }
}
