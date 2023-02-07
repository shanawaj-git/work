package com.albatha.springsecuritypoc.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.util.function.Tuple3;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class Permissions {

    @Bean
    Map<Tuple3<String, String, String>, String> getPermissions() {
        return new HashMap<>();
    }
}
