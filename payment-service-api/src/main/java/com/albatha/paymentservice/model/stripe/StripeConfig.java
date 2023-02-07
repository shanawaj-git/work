package com.albatha.paymentservice.model.stripe;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "stripe_config")
@TypeAlias("stripe_config")
@NoArgsConstructor
@AllArgsConstructor
public class StripeConfig {
    private String accountId;
    private String secret_key;
    private String public_key;


}
