package com.nexthealth.springbootkeycloak.kafka.producer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nexthealth.springbootkeycloak.dto.GenerateOTPInput;
import com.nexthealth.springbootkeycloak.dto.GenerateOTPOutput;
import com.nexthealth.springbootkeycloak.kafkamodel.Data;
import com.nexthealth.springbootkeycloak.kafkamodel.OtpKafkaEvent;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.header.internals.RecordHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.event.KafkaEvent;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;
import org.apache.kafka.common.header.Header;
import java.util.List;

@Component
@Slf4j
public class OtpEventProducer {

    @Value("${KAFKA_GENERATE_OTP_TOPIC}")
    String topic ="authentication";

    final KafkaTemplate<Integer,String> kafkaTemplate;
    final ObjectMapper objectMapper;

    public OtpEventProducer(KafkaTemplate<Integer, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    public void sendOtpEvent(OtpKafkaEvent otpKafkaEvent) throws JsonProcessingException {

        String value = objectMapper.writeValueAsString(otpKafkaEvent);
        log.info("message to kafka "+value);
        ProducerRecord<Integer,String> producerRecord = buildProducerRecord(1, value, topic);
        ListenableFuture<SendResult<Integer,String>> listenableFuture =  kafkaTemplate.send(producerRecord);
        listenableFuture.addCallback(new ListenableFutureCallback<SendResult<Integer, String>>() {
            @Override
            public void onFailure(Throwable ex) {
                handleFailure(null, value, ex);
            }

            @Override
            public void onSuccess(SendResult<Integer, String> result) {
                handleSuccess(null, value, result);
            }
        });
    }
    private ProducerRecord<Integer, String> buildProducerRecord(Integer key, String value, String topic) {

        List<Header> recordHeaders = List.of(new RecordHeader("event-source", "Keycloak".getBytes()));
        return new ProducerRecord<>(topic, null, key, value, recordHeaders);
    }

    private void handleFailure(Integer key, String value, Throwable ex) {
        log.error("Error Sending the Message and the exception is {}", ex.getMessage());

    }

    private void handleSuccess(Integer key, String value, SendResult<Integer, String> result) {
        log.info("Message Sent SuccessFully for the key : {} and the value is {} , partition is {}", key, value, result.getRecordMetadata().partition());
    }


    public OtpKafkaEvent constructMessage(GenerateOTPOutput generateOTPOutput, GenerateOTPInput generateOTPInput)
    {
        Data data =new Data();
        data.setOtp(generateOTPOutput.getOtp());
        data.setPhoneNumber(generateOTPInput.getPhoneNumber());

        OtpKafkaEvent otpKafkaEvent=new OtpKafkaEvent();
        otpKafkaEvent.setEventType("authentication.otpGenerated");
        otpKafkaEvent.setTopic(topic);
        otpKafkaEvent.setData(data);
        return otpKafkaEvent;
    }
}
