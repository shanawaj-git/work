package com.albatha.paymentservice.model;

import com.albatha.paymentservice.dto.AppConfigDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "app_config")
@TypeAlias("app_config")
public class AppConfig {

    private PaymentProvider provider;
    private Object providerConfig;
    private List<PaymentMethodType> paymentMethodTypes;

    public AppConfig(AppConfigDTO appConfigDTO){
        this.provider = appConfigDTO.getProvider();
        this.providerConfig = appConfigDTO.getProviderConfig();
        this.paymentMethodTypes = appConfigDTO.getPaymentMethodTypes();
    }
}
