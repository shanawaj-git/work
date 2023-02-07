package com.albatha.nexthealth.patientsservice.config;

import com.albatha.nexthealth.patientsservice.utils.DateTimeUtils;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.sql.Timestamp;
import java.time.OffsetDateTime;

@Configuration
public class ModelMapperConfig {

    @Bean("customModelMapper")
    public ModelMapper customModelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        Converter<OffsetDateTime, Timestamp> toTimestamp = new AbstractConverter<OffsetDateTime, Timestamp>() {
            @Override
            protected Timestamp convert(OffsetDateTime source) {
                return DateTimeUtils.toTimeStamp(source);
            }
        };
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        modelMapper.addConverter(toTimestamp);
        return modelMapper;
    }
}
