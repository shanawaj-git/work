package com.albatha.paymentservice.service.impl;


import com.albatha.paymentservice.constants.ErrorMessage;
import com.albatha.paymentservice.constants.EventType;
import com.albatha.paymentservice.constants.Topics;
import com.albatha.paymentservice.domain.Event;
import com.albatha.paymentservice.dto.PaymentMethodCreatedEvent;
import com.albatha.paymentservice.dto.PaymentMethodDeleteEvent;
import com.albatha.paymentservice.dto.input.PaymentMethodInputDTO;
import com.albatha.paymentservice.dto.output.PaymentMethodDeleteOutputDTO;
import com.albatha.paymentservice.dto.output.PaymentMethodOutputDTO;
import com.albatha.paymentservice.exception.CustomerNotFoundException;
import com.albatha.paymentservice.exception.InvalidInputDetailsException;
import com.albatha.paymentservice.exception.PaymentNotFoundException;
import com.albatha.paymentservice.kafka.producer.EventProducer;
import com.albatha.paymentservice.model.*;
import com.albatha.paymentservice.repository.CustomerRepository;
import com.albatha.paymentservice.service.PaymentMethodService;
import com.albatha.paymentservice.service.provider.PaymentMethodProviderData;
import com.albatha.paymentservice.service.provider.PaymentMethodProviderService;
import com.albatha.paymentservice.transformer.PaymentProviderValueConverter;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.function.Predicate;

@Service
@Slf4j
public class PaymentMethodServiceImpl implements PaymentMethodService {
    private final PaymentMethodProviderService paymentMethodProviderService;
    private final CustomerRepository customerRepository;
    private final ModelMapper modelMapper;
    private final EventProducer eventProducer;
    private Predicate<PaymentMethod> getActivePaymentMethods = paymentMethod -> paymentMethod.isActive() == true;
    public PaymentMethodServiceImpl(PaymentMethodProviderService paymentMethodProviderService,

                                    CustomerRepository customerRepository,
                                    ModelMapper modelMapper,
                                    EventProducer eventProducer) {

        this.paymentMethodProviderService = paymentMethodProviderService;
        this.customerRepository = customerRepository;
        this.modelMapper = modelMapper;
        this.eventProducer = eventProducer;
    }

    @Override
    public Mono<PaymentMethodOutputDTO> addPaymentMethod(UUID customerId,
                                                         PaymentMethodInputDTO paymentMethodInputDTO) {
                log.info("Calling  PaymentMethodServiceImpl.addPaymentMethod ");
                return customerRepository.getCustomerById(customerId)
                        .switchIfEmpty(Mono.error(new CustomerNotFoundException(ErrorMessage.CUSTOMER_NOT_FOUND)))
                        .flatMap(customer -> addPaymentMethodInProvider(customer, paymentMethodInputDTO)
                                .flatMap(paymentMethodProviderData -> constructPaymentMethod(customer, paymentMethodInputDTO, paymentMethodProviderData))
                        .doOnNext(paymentMethod -> saveCustomer(paymentMethod,customer))
                        .map(paymentMethod -> modelMapper.map(paymentMethod,PaymentMethodOutputDTO.class))
                                .doOnNext(this::producePaymentMethodCreatedEvent));
    }

    @Override
    public Mono<PaymentMethodDeleteOutputDTO> deletePaymentMethod(UUID customerId, UUID paymentMethodId) {
        log.info("Calling  deletePaymentMethod.");
                return customerRepository.getCustomerById(customerId)
                        .switchIfEmpty(Mono.error(new CustomerNotFoundException(ErrorMessage.CUSTOMER_NOT_FOUND)))
                        .flatMap(customer -> getPaymentMethodAttachedToCustomer(customer,paymentMethodId)
                        .switchIfEmpty(Mono.error(new InvalidInputDetailsException(ErrorMessage.INVALID_PAYMENT_METHOD)))
                        .flatMap(paymentMethod-> deletePaymentMethodFromProvider(customer,paymentMethod.getProviderPaymentMethodId())
                        .flatMap(paymentMethodProviderData->constructDeletePaymentMethodResponse(paymentMethodId,customerId)
                        .doOnNext(paymentMethodDeleteOutputDTO->deletePaymentMethodAttachedToCustomer(customer,paymentMethodId)))
                        .doOnNext(this::producePaymentMethodDeleteEvent)));
    }
    @Override
    public Mono<PaymentMethodOutputDTO> updatePaymentMethod(UUID customerId, UUID paymentMethodId,PaymentMethodInputDTO paymentMethodInputDTO) {
        log.info("Calling  PaymentMethodServiceImpl.deletePaymentMethod ");
        return customerRepository.getCustomerById(customerId)
                        .switchIfEmpty(Mono.error(new CustomerNotFoundException(ErrorMessage.CUSTOMER_NOT_FOUND)))
                        .flatMap(customer -> getPaymentMethodAttachedToCustomer(customer,paymentMethodId)
                        .switchIfEmpty(Mono.error(new InvalidInputDetailsException(ErrorMessage.INVALID_PAYMENT_METHOD)))
                        .flatMap(paymentMethod -> updatePaymentMethodInProvider(customer, paymentMethodInputDTO,paymentMethod.getProviderPaymentMethodId())
                        .flatMap(paymentMethodProviderData -> constructPaymentMethodForUpdate(customer, paymentMethodInputDTO, paymentMethodProviderData,paymentMethodId))
                        .doOnNext(updatedPaymentMethod -> updatePaymentMethodDB(updatedPaymentMethod,customer))
                        .map(updatedPaymentMethod -> modelMapper.map(updatedPaymentMethod,PaymentMethodOutputDTO.class)))
                        .doOnNext(this::producePaymentMethodUpdateEvent));
    }
    private Mono<PaymentMethodDeleteOutputDTO> constructDeletePaymentMethodResponse(UUID paymentMethodId, UUID customerId) {
        log.info("Calling constructDeletePaymentMethodResponse");
        return Mono.just(new PaymentMethodDeleteOutputDTO(true, customerId, paymentMethodId));
    }

    private Mono<PaymentMethodProviderData> deletePaymentMethodFromProvider(Customer customer, String paymentMethodProviderId) {
        log.info("Calling deletePaymentMethod");
        return paymentMethodProviderService.deletePaymentMethod(customer, paymentMethodProviderId);
    }

    private Mono<PaymentMethod> getPaymentMethodAttachedToCustomer(Customer customer, UUID paymentId) {
        log.info("Calling isPaymentMethodAttachedToCustomer");

        List<PaymentMethod> paymentMethods = customer.getPaymentMethods().stream()
                .filter(paymentMethod -> paymentMethod.getId().equals(paymentId))
                .collect(Collectors.toList());

        return (Optional.ofNullable(paymentMethods).isEmpty() || paymentMethods.isEmpty()) ? Mono.empty() : Mono.just(paymentMethods.get(0));
    }
    private Mono<PaymentMethodProviderData> updatePaymentMethodInProvider(Customer customer,
                                                                       PaymentMethodInputDTO paymentMethodInputDTO,String providerPaymentMethodId) {
        log.info("Calling updatePaymentMethodInProvider");
        return paymentMethodProviderService.updatePaymentMethod(customer, paymentMethodInputDTO,providerPaymentMethodId);
    }
    private Mono<PaymentMethodProviderData> addPaymentMethodInProvider(Customer customer,
                                                                       PaymentMethodInputDTO paymentMethodInputDTO) {
        log.info("Calling addPaymentMethodInProvider");
        return paymentMethodProviderService.addPaymentMethod(customer, paymentMethodInputDTO);

    }

    private Mono<PaymentMethod> constructPaymentMethod(Customer customer,
                                                  PaymentMethodInputDTO paymentMethodInputDTO,
                                                  PaymentMethodProviderData paymentMethodProviderData) {
        log.info("Calling constructPaymentMethod");
        Optional<BillingDetails> billingDetails = constructBillingDetails(paymentMethodInputDTO);
        CardDetails cardDetails = new CardDetails(paymentMethodProviderData, paymentMethodInputDTO);
        PaymentMethod paymentMethod = new PaymentMethod(paymentMethodInputDTO,
                                            paymentMethodProviderData,
                                            billingDetails.orElse(null),
                                            cardDetails,customer);
      return  Mono.just(paymentMethod);
    }

    private void populatePaymentMethod(PaymentMethodInputDTO paymentMethodInputDTO, PaymentMethod paymentMethod, Optional<BillingDetails> billingDetails, CardDetails cardDetails, com.stripe.model.PaymentMethod stripePaymentMethod) {
        paymentMethod.setType(PaymentProviderValueConverter.paymentMethodMap.get(stripePaymentMethod.getType()));
        paymentMethod.setDefault(paymentMethodInputDTO.isDefault());
        paymentMethod.setBillingDetails(billingDetails.orElse(null));
        paymentMethod.setCard(cardDetails);
    }
    private void saveCustomer(PaymentMethod paymentMethod, Customer customer) {
        customer.getPaymentMethods().add(paymentMethod);
        customerRepository.save(customer).subscribe();
    }
    private void updatePaymentMethodDB(PaymentMethod paymentMethod, Customer customer) {
        List<PaymentMethod> paymentMethodList=customer.getPaymentMethods().stream()
                         .filter(payMethod -> payMethod.getId()!=paymentMethod.getId())
                         .collect(Collectors.toList());
        paymentMethodList.add(paymentMethod);
        customer.setPaymentMethods(paymentMethodList);
        customerRepository.save(customer).subscribe();
    }
    private void producePaymentMethodCreatedEvent(PaymentMethodOutputDTO paymentMethodOutputDTO) {
        PaymentMethodCreatedEvent paymentMethodCreatedEvent=new PaymentMethodCreatedEvent(Topics.PAYMENT.label,EventType.NEW_PAYMENT_METHOD.label,paymentMethodOutputDTO);
        Event<?> newPaymentMethodEvent = new Event<>(Topics.PAYMENT.label, EventType.NEW_PAYMENT_METHOD.label, paymentMethodCreatedEvent);
        eventProducer.produce(newPaymentMethodEvent);
    }

    private void producePaymentMethodUpdateEvent(PaymentMethodOutputDTO paymentMethodOutputDTO) {
        PaymentMethodCreatedEvent paymentMethodUpdatedEvent=new PaymentMethodCreatedEvent(Topics.PAYMENT.label,EventType.UPDATE_PAYMENT_METHOD.label,paymentMethodOutputDTO);
        Event<?> updatePaymentMethodEvent = new Event<>(Topics.PAYMENT.label, EventType.UPDATE_PAYMENT_METHOD.label, paymentMethodUpdatedEvent);
        eventProducer.produce(updatePaymentMethodEvent);
    }
    private void producePaymentMethodDeleteEvent(PaymentMethodDeleteOutputDTO paymentMethodDeleteOutputDTO) {
        PaymentMethodDeleteEvent paymentMethodDeleteEvent=new PaymentMethodDeleteEvent(Topics.PAYMENT.label,EventType.NEW_PAYMENT_METHOD.label,paymentMethodDeleteOutputDTO);
        Event<?> newPaymentMethodEvent = new Event<>(Topics.PAYMENT.label, EventType.DELETE_PAYMENT_METHOD.label, paymentMethodDeleteEvent);
        eventProducer.produce(newPaymentMethodEvent);
    }

    private void deletePaymentMethodAttachedToCustomer(Customer customer,UUID paymentId) {
        log.info("Calling deletePaymentMethodAttachedToCustomer");
        customer.getPaymentMethods().stream()
               .forEach(paymentMethod -> {
                   if(paymentMethod.getId().equals(paymentId))
                    paymentMethod.setActive(false);
               });
        customer.setPaymentMethods(customer.getPaymentMethods());
        customerRepository.save(customer).subscribe();
    }
    private Mono<PaymentMethod> constructPaymentMethodForUpdate(Customer customer,
                                                       PaymentMethodInputDTO paymentMethodInputDTO,
                                                       PaymentMethodProviderData paymentMethodProviderData,UUID paymentMethodId) {
        log.info("Calling constructPaymentMethodForUpdate");
        Optional<BillingDetails> billingDetails = constructBillingDetails(paymentMethodInputDTO);
        CardDetails cardDetails = new CardDetails(paymentMethodProviderData, paymentMethodInputDTO);
        return constructPaymentMethod(customer, paymentMethodInputDTO, paymentMethodProviderData, paymentMethodId, billingDetails, cardDetails);
    }
    private Optional<BillingDetails> constructBillingDetails(PaymentMethodInputDTO paymentMethodInputDTO) {
        log.info("Calling constructBillingDetails");
        return Optional.ofNullable(paymentMethodInputDTO.getBillingDetails()).map(billingDetailsDTO -> {
            BillingDetails billingDetail = null;
            if (Optional.ofNullable(billingDetailsDTO).isPresent()) {
                Address address = null;
                if (billingDetailsDTO.getAddress() != null) {
                    address = new Address(billingDetailsDTO.getAddress());
                }
                billingDetail = new BillingDetails(billingDetailsDTO, address);
            }
            return billingDetail;
        });
    }
    private Mono<PaymentMethod> constructPaymentMethod(Customer customer, PaymentMethodInputDTO paymentMethodInputDTO, PaymentMethodProviderData paymentMethodProviderData, UUID paymentMethodId, Optional<BillingDetails> billingDetails, CardDetails cardDetails) {
        log.info("Calling constructPaymentMethod");
        Optional<PaymentMethod> paymentMethod = customer.getPaymentMethods().stream().filter(paymentMethod1 -> paymentMethod1.getId().equals(paymentMethodId)).findFirst();
        com.stripe.model.PaymentMethod stripePaymentMethod = (com.stripe.model.PaymentMethod) paymentMethodProviderData.getMetadata();
        if (paymentMethod.isPresent()) {
            paymentMethod.get().setType(PaymentProviderValueConverter.paymentMethodMap.get(stripePaymentMethod.getType()));
            paymentMethod.get().setBillingDetails(billingDetails.orElse(null));
            paymentMethod.get().setCard(cardDetails);
            paymentMethod.get().setCustomerId(customer.getId());
            paymentMethod.get().setDefault(paymentMethodInputDTO.isDefault());
        }
        return Mono.just(paymentMethod.orElse(null));
    }


    @Override
    public Mono<PaymentMethodOutputDTO> getPaymentMethodAttachedToCustomer(UUID customerId, UUID paymentMethodId) {
        log.info("Calling PaymentMethodServiceImpl.retrievePaymentMethod");
        return getCustomerById(customerId)
                .flatMap(customer -> getAllPaymentMethods(customer.getPaymentMethods(), paymentMethodId))
                .map(paymentMethod -> modelMapper.map(paymentMethod, PaymentMethodOutputDTO.class));

    }

    @Override
    public Flux<PaymentMethodOutputDTO> getAllPaymentMethodsAttachedToCustomer(UUID customerId){
        log.info("Calling PaymentMethodServiceImpl.getAllPaymentMethodsAttachedToCustomer");
            return getCustomerById(customerId)
                    .flux()
                    .flatMap(customer -> getPaymentMethodById(customer.getPaymentMethods()))
                    .map(paymentMethod -> modelMapper.map(paymentMethod, PaymentMethodOutputDTO.class));
    }

    private Mono<Customer> getCustomerById(UUID customerId){
        log.info("Calling PaymentMethodServiceImpl.getCustomerById");
        return customerRepository.getCustomerById(customerId)
                .switchIfEmpty(Mono.error(new CustomerNotFoundException(ErrorMessage.CUSTOMER_NOT_FOUND)));
    }

    private Mono<PaymentMethod> getAllPaymentMethods(List<PaymentMethod> paymentMethod, UUID paymentMethodId){
        log.info("Calling PaymentMethodServiceImpl.filterCustomersPaymentMethodByPaymentMethodId");
        Optional<PaymentMethod> result = paymentMethod.stream()
                .filter(method -> method.getId().equals(paymentMethodId))
                .filter(getActivePaymentMethods).findAny();
        return result.map(Mono::just).orElseGet(() -> Mono.error(new PaymentNotFoundException(ErrorMessage.PAYMENT_NOT_FOUND)));
    }

    private Flux<PaymentMethod> getPaymentMethodById(List<PaymentMethod> paymentMethod){
        log.info("Calling PaymentMethodServiceImpl.filterCustomersPaymentMethodWithoutPaymentMethodId");
       return Flux.fromIterable(paymentMethod.stream()
                .filter(getActivePaymentMethods).collect(Collectors.toList()))
                .switchIfEmpty(Flux.error(new PaymentNotFoundException(ErrorMessage.PAYMENT_NOT_FOUND)));
    }

}
