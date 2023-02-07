package com.albatha.springsecuritypoc.config;

import com.albatha.springsecuritypoc.model.CurrentUser;
import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.util.function.Predicate.not;

@Configuration
public class JWTFilter extends OncePerRequestFilter {
    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final Pattern BEARER_PATTERN = Pattern.compile("^Bearer (.+?)$");

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        Optional<String> token = getToken(request);
        // TODO could verify with KEYCLOAK
        if (token.isEmpty()) throw new AccessDeniedException("Unauthorized");
        // TODO get roles from token claims
        getDecodedToken(token.get())
                .map(DecodedJWT::getSubject)
                .map(CurrentUser::new)
                .map(userDetails -> JWTPreAuthenticationToken
                        .builder()
                        .principal(userDetails)
                        .details(new WebAuthenticationDetailsSource().buildDetails(request))
                        .build()
                )
                .ifPresent(jwtPreAuthenticationToken -> SecurityContextHolder.getContext().setAuthentication(jwtPreAuthenticationToken));

        filterChain.doFilter(request, response);
    }

    private Optional<String> getToken(HttpServletRequest request) {
        return Optional
                .ofNullable(request.getHeader(AUTHORIZATION_HEADER))
                .filter(not(String::isEmpty))
                .map(BEARER_PATTERN::matcher)
                .filter(Matcher::find)
                .map(matcher -> matcher.group(1));
    }

    private Optional<DecodedJWT> getDecodedToken(String token) {
        try {
            return Optional.of(JWT.decode(token));
        } catch (JWTVerificationException ex) {
            return Optional.empty();
        }
    }
}
