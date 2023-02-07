package com.nexthealth.springbootkeycloak.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@ToString
public class JwtTokenDTO {

    String access_token;
    String expires_in;
    String refresh_expires_in;
    String refresh_token;
    String token_type;
    String session_state;
    String scope;


}
