package com.albatha.paymentservice.service.stripe.impl;

import com.albatha.paymentservice.constants.ErrorMessage;
import com.albatha.paymentservice.dto.input.PaymentMethodInputDTO;
import com.albatha.paymentservice.model.Customer;
import com.albatha.paymentservice.service.provider.PaymentMethodProviderData;
import com.albatha.paymentservice.service.provider.PaymentMethodProviderService;
import com.albatha.paymentservice.service.provider.exception.PaymentProviderServiceException;
import com.albatha.paymentservice.service.stripe.params.AttachCustomerToPaymentMethodParam;
import com.albatha.paymentservice.service.stripe.params.PaymentMethodParams;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentMethod;
import com.stripe.net.RequestOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;


import static com.albatha.paymentservice.service.stripe.utils.StripeUtils.getRequestOptions;

@Service
@Slf4j
public class StripePaymentMethodServiceImpl implements PaymentMethodProviderService {

    @Override
    public Mono<PaymentMethodProviderData> addPaymentMethod(Customer customer, PaymentMethodInputDTO paymentMethodInputDTO) throws PaymentProviderServiceException {
        PaymentMethod paymentMethod = createPaymentMethod(customer, paymentMethodInputDTO);
        PaymentMethodProviderData paymentMethodProviderData = attachCustomerToPaymentMethod(customer, paymentMethod);
        return Mono.just(paymentMethodProviderData);
    }

    @Override
    public Mono<PaymentMethodProviderData> deletePaymentMethod(Customer customer, String paymentProviderMethodId) throws PaymentProviderServiceException {
        log.info("Delete Payment method in Stripe");
        PaymentMethod updatedPaymentMethod = null;
        try {
            RequestOptions requestOptions=getRequestOptions(customer.getApplication());
            updatedPaymentMethod=PaymentMethod.retrieve(paymentProviderMethodId, requestOptions).detach(requestOptions);
        } catch (StripeException e) {
            log.error("Exception while deleting Payment Method in Stripe");
            throw new PaymentProviderServiceException(ErrorMessage.STRIPE_DELETE_PAYMENT_METHOD_EXCEPTION, e);
        }
        return Mono.just(new PaymentMethodProviderData(updatedPaymentMethod.getId(), updatedPaymentMethod));
    }

    public PaymentMethod createPaymentMethod(Customer customer, PaymentMethodInputDTO paymentMethodInputDTO) throws PaymentProviderServiceException {
        log.info("Creating Payment method in Stripe");
        PaymentMethodParams params = createPaymentMethodParams(paymentMethodInputDTO);
        PaymentMethod paymentMethod = null;
        try {
            paymentMethod = PaymentMethod.create(params, getRequestOptions(customer.getApplication()));
        } catch (StripeException e) {
            log.error("Exception while creating Payment Method in Stripe");
            throw new PaymentProviderServiceException(ErrorMessage.CREATE_PAYMENT_METHOD_STRIPE, e);
        }
        log.info("Payment method created in Stripe with Id {}", paymentMethod.getId());
        return paymentMethod;
    }

    public PaymentMethodProviderData attachCustomerToPaymentMethod(Customer customer, PaymentMethod paymentMethod) throws PaymentProviderServiceException {
        log.info("Attaching Customer to payment method in Stripe");
        AttachCustomerToPaymentMethodParam params = createAttachCustomerToPaymentMethodParams(customer.getProviderCustomerId());
        try {
            paymentMethod = paymentMethod.attach(params, getRequestOptions(customer.getApplication()));
        } catch (StripeException e) {
            log.error("Exception while Attaching Customer to payment method in Stripe");
            throw new PaymentProviderServiceException(ErrorMessage.ATTACH_PAYMENT_METHOD_STRIPE, e);
        }
        log.info("Customer attached to payment method");
        return new PaymentMethodProviderData(paymentMethod.getId(), paymentMethod);
    }

    public Mono<PaymentMethodProviderData> updatePaymentMethod(Customer customer, PaymentMethodInputDTO paymentMethodInputDTO, String paymentMethodProviderId) throws PaymentProviderServiceException {
        log.info("UpdatePaymentMethod Payment method in Stripe");
        PaymentMethod paymentMethod=null;
        try{
        RequestOptions requestOptions=getRequestOptions(customer.getApplication());
        PaymentMethodParams params = updatePaymentMethodParams(paymentMethodInputDTO);
        paymentMethod  = PaymentMethod.retrieve(paymentMethodProviderId,requestOptions).update(params, getRequestOptions(customer.getApplication()));
        } catch (StripeException e) {
            log.error("Exception while updating Payment Method in Stripe");
            throw new PaymentProviderServiceException(ErrorMessage.UPDATE_PAYMENT_METHOD_STRIPE, e);
        }
        log.info("Payment method updating in Stripe with Id {}", paymentMethod.getId());
        return Mono.just(new PaymentMethodProviderData(paymentMethod.getId(), paymentMethod));
    }

    private PaymentMethodParams createPaymentMethodParams(PaymentMethodInputDTO paymentMethodInputDTO) {
        return new PaymentMethodParams(paymentMethodInputDTO,"create");
    }

    private PaymentMethodParams updatePaymentMethodParams(PaymentMethodInputDTO paymentMethodInputDTO) {
        return new PaymentMethodParams(paymentMethodInputDTO,"update");
    }

    private AttachCustomerToPaymentMethodParam createAttachCustomerToPaymentMethodParams(String providerCustomerId) {
        return new AttachCustomerToPaymentMethodParam(providerCustomerId);
    }
}
