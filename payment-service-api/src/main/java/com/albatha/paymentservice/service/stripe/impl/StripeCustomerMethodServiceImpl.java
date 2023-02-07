package com.albatha.paymentservice.service.stripe.impl;

import com.albatha.paymentservice.constants.ErrorMessage;
import com.albatha.paymentservice.dto.CustomerDTO;
import com.albatha.paymentservice.service.provider.CustomerMethodProviderData;
import com.albatha.paymentservice.service.provider.CustomerMethodProviderService;
import com.albatha.paymentservice.service.provider.exception.PaymentProviderServiceException;
import com.albatha.paymentservice.service.stripe.params.CustomerMethodParams;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import java.util.function.Function;

import static com.albatha.paymentservice.service.stripe.utils.StripeUtils.getRequestOptions;

@Service
@Slf4j
public class StripeCustomerMethodServiceImpl  implements CustomerMethodProviderService {
    @Override
    public Mono<CustomerMethodProviderData> saveCustomerOnProvider(CustomerDTO customerDTO) throws PaymentProviderServiceException {
        Customer providerCustomerResponse = saveOperation(customerDTO);
        CustomerMethodProviderData customerMethodProviderData = createCustomerProviderMeta.apply(providerCustomerResponse);
        return Mono.just(customerMethodProviderData);
    }


    public Customer saveOperation(CustomerDTO customerDTO) throws PaymentProviderServiceException{
        log.info("Creating Customer method in Stripe");
        CustomerMethodParams params = createCustomerMethodParams(customerDTO);
        Customer customerMethod = null;
        try{
            customerMethod = Customer.create(params);
        }catch (StripeException ex){
            log.error("Execution while creating Customer Method in Stripe");
            throw new PaymentProviderServiceException(ErrorMessage.STRIPE_CUSTOMER_CREATE_EXCEPTION);
        }
        return customerMethod;
    }


    public CustomerMethodParams createCustomerMethodParams(CustomerDTO customerDTO){
        return new CustomerMethodParams(customerDTO);
    }

   Function<Customer,CustomerMethodProviderData> createCustomerProviderMeta = (customer -> {
       CustomerMethodProviderData customerMethodProviderData = new CustomerMethodProviderData();
       customerMethodProviderData.setProviderCustomerId(customer.getId());
       customerMethodProviderData.setMetadata(customer);

       return customerMethodProviderData;
   });
}
