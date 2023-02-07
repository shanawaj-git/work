package com.albatha.springsecuritypoc.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CurrentUser implements UserDetails {

    private UUID id;
    private String username;

    private List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("USER"));

    public CurrentUser(String id) {
        this.id = UUID.fromString(id);
    }

    public CurrentUser(UUID id, String username) {
        this.id = id;
        this.username = username;
    }

    public Boolean is(String role) {
        return authorities.stream().map(SimpleGrantedAuthority::getAuthority).collect(Collectors.toList()).contains(role);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
