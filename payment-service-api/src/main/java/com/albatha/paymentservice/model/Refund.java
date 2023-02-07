package com.albatha.paymentservice.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.Currency;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "refund")
@TypeAlias("refund")
public class Refund {
    @Id
    private UUID id;
    private UUID organizationId;
    private Organization organization;

    private UUID applicationId;
    private Application application;

    private UUID paymethodId;
    private PaymentMethod paymentMethod;

    private Double amount;
    private Currency currency;
    private LocalDateTime createdAt;
    private RefundReason refundReason;
    private RefundStatus status;
    private String correlationId;
    private String providerRefundId;
    private Object metadata;
    private Object providerMetadata;
    private RefundEvent history;
}

