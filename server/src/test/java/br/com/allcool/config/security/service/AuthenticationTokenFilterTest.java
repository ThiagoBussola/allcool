package br.com.allcool.config.security.service;

import static org.mockito.ArgumentMatchers.*;

import static org.mockito.Mockito.*;

import java.io.IOException;

import javax.servlet.ServletException;

import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import br.com.allcool.person.repository.PersonRepository;

// TODO
public class AuthenticationTokenFilterTest {
    
	private final static String AUTHORIZATION_HEADER = "Authorization";
	
	@Autowired
	private PersonRepository personRepository;
	
	private final TokenService tokenService = mock(TokenService.class);
	
    private AuthenticationTokenFilter filter = new AuthenticationTokenFilter(tokenService, personRepository);
    private MockHttpServletResponse servletResponse = new MockHttpServletResponse();
    private MockHttpServletRequest servletRequest = new MockHttpServletRequest();

    @Before
    public void setup() {

        servletRequest.addHeader(AUTHORIZATION_HEADER, "Bearer ");
    }

    @Test
    public void returnOn403() throws ServletException, IOException {

        servletResponse.setStatus(HttpStatus.FORBIDDEN.value());

        filter.doFilter(servletRequest, servletResponse, new MockFilterChain());

        verify(tokenService, times(0)).validateToken(anyString());

    }

    @Test
    public void returnOn404() throws ServletException, IOException {


        servletResponse.setStatus(HttpStatus.NOT_FOUND.value());

        filter.doFilter(servletRequest, servletResponse, new MockFilterChain());

        verify(tokenService, times(0)).validateToken(anyString());
        
    }

}
