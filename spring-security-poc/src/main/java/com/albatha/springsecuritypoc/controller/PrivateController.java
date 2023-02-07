package com.albatha.springsecuritypoc.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/v1/private")
public class PrivateController {

    @GetMapping("all")
    List<String> getAllPrivate() {
        return List.of("Private Data");
    }
}