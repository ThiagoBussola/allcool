package br.com.allcool.config.security;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;

import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.allcool.config.security.resource.AuthenticationResource;
import br.com.allcool.config.security.resource.LoginRequest;
import br.com.allcool.config.security.resource.TokenDTO;
import br.com.allcool.person.domain.Person;
import br.com.allcool.person.repository.PersonRepository;
import br.com.allcool.person.service.PersonService;
import br.com.allcool.test.ResourceTest;

@RunWith(SpringRunner.class)
@ResourceTest(AuthenticationResource.class)
public class AuthenticationResourceTest {

	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@MockBean
	private PersonService personService;
	
	@MockBean
	private AuthenticationService authenticationService;
	
	@MockBean
	private TokenService tokenService;
	
	@MockBean
	private AuthenticationManager authManager;
	
	@MockBean
	private PersonRepository personRepository;
	
	@Test
	public void login() throws Exception {
		
		LoginRequest login = new LoginRequest();
		login.setEmail("teste@hotmail.com");
		login.setPassword("2020");
		
		MvcResult result = mockMvc.perform(post("/auth/login")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsBytes(login)))
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().isOk()).andReturn();
				
		TokenDTO token = objectMapper.readValue(result.getResponse().getContentAsByteArray(), TokenDTO.class);
		
		assertThat(token.getToken()).isNotNull();
		assertThat(token.getTipoAuth()).isEqualTo("Bearer");
	}	
	
	@Test
	public void register() throws Exception {
		
		mockMvc.perform(post("/auth/register")
				.accept(MediaType.APPLICATION_JSON)
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsBytes(createPerson())))
				.andDo(MockMvcResultHandlers.print())
				.andExpect(status().isCreated()).andReturn();
				
	}
	
	private Person createPerson() {
		
		Person person = new Person();
		person.setName("Testeando");
		person.setEmail("testando@teste.com");
		person.setPassword("teste");
		person.setBirthDate(LocalDate.of(2020, 5, 21));
		
		return person;
	}
}
