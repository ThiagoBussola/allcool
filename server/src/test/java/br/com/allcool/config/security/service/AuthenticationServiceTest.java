package br.com.allcool.config.security.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Optional;
import java.util.UUID;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.junit4.SpringRunner;

import br.com.allcool.config.security.service.AuthenticationService;
import br.com.allcool.person.domain.Person;
import br.com.allcool.person.repository.PersonRepository;

// TODO
@RunWith(SpringRunner.class)
public class AuthenticationServiceTest {

	private PersonRepository personRepository = mock(PersonRepository.class);
	
	@Rule
    public ExpectedException expectedException = ExpectedException.none();
	
	private AuthenticationService authenticationService = mock(AuthenticationService.class);
	
	@Before
	public void setup() {
		
		Person person = new Person();
		person.setId(UUID.fromString("affb9869-61b3-4100-bafd-df7cf46ef341"));
		person.setEmail("teste@hotmail.com");
		
		when(personRepository.findByEmail(ArgumentMatchers.any())).thenReturn(Optional.of(person));
	}
	
	
	@Test
	public void loadUserByUsername() throws Exception {
		
		UserDetails loadUserByUsername = authenticationService.loadUserByUsername("teste@hotmail.com");
		
        assertThat(loadUserByUsername.getUsername()).isEqualTo(UUID.fromString("affb9869-61b3-4100-bafd-df7cf46ef341"));
	}
	
	@Test
	public void loadUserByUsernameNotFound() throws Exception {
		
		expectedException.expectMessage("Dados inv�lidos");
		
		authenticationService.loadUserByUsername("exception@hotmail.com");

	}
}
