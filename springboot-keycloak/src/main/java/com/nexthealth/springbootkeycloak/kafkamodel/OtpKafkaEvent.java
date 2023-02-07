package com.nexthealth.springbootkeycloak.kafkamodel;

import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OtpKafkaEvent {

    String topic;
    String eventType;
    Data data;
}
