package com.albatha.paymentservice.dto;

import lombok.Data;

@Data
public class WalletDTO {
    private String type;
    private String deviceAccountNumber;
    private String maskedDeviceAccountNumber;
}
