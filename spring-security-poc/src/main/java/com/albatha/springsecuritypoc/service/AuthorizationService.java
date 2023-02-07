package com.albatha.springsecuritypoc.service;

import com.albatha.springsecuritypoc.model.Album;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService {

    @PreAuthorize("hasPermission(#album, #action)")
    public void check(Album album, String action) {
        return;
    }
}
