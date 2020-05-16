package br.com.allcool.config.security.service;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

import static org.hamcrest.CoreMatchers.notNullValue;

import org.junit.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

// TODO
public class TokenServiceTest {
	
    private static final String EMAIL = "teste@email.com";

    private TokenService tokenService;

	@Test
    public void testCreateSimpleToken() {
    	
        final UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(EMAIL, null);
        final String token = tokenService.createToken(auth);

        assertThat(token, notNullValue());
    }
}

