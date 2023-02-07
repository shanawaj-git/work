package com.albatha.springsecuritypoc.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/public")
public class PublicController {

    @GetMapping("all")
    List<String> getAllPublic() {
        return List.of("Public Data");
    }
}