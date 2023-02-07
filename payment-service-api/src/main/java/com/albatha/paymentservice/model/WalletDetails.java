package com.albatha.paymentservice.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WalletDetails {
    private String maskedDeviceAccountNumber;
    private WalletType type;
}
