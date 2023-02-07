package com.albatha.paymentservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "payment")
@TypeAlias("payment")
public class Payment {
    @Id
    private UUID id;

    private UUID organizationId;
    private Organization organization;

    private UUID applicationId;
    private Application application;

    private UUID customerId;
    private Customer customer;

    private LocalDateTime createdAt;
    private Double amount;
    private Double amountCapturable;
    private Double amountReceived;
    private Currency currency;
    private PaymentMethod paymentMethod;
    private Boolean autoCapture;
    private PaymentAction requiredAction;
    private PaymentStatus status;
    private String idempotencyKey;
    private String correlationId;
    private Object metadata;
    private String providerPaymentId;
    private Object providerMetadata;
    private List<PaymentEvent> history;

}
