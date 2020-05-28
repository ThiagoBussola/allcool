package br.com.allcool.person.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.allcool.config.security.TokenService;
import br.com.allcool.config.security.resource.LoginRequest;
import br.com.allcool.config.security.resource.TokenDTO;
import br.com.allcool.person.domain.Person;
import br.com.allcool.person.repository.PersonRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PersonService {

	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private TokenService tokenService;
	
	@Autowired
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	private final PersonRepository personRepository;
	
	public ResponseEntity<TokenDTO> login(LoginRequest login) {	
		
		UsernamePasswordAuthenticationToken dadosLogin = new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword());	
		
		try {
			
			Authentication auth = authManager.authenticate(dadosLogin);
			String token = tokenService.createToken(auth);
			return ResponseEntity.ok(new TokenDTO(token, "Bearer"));
			
		} catch (AuthenticationException e) {
			return ResponseEntity.badRequest().build();
		}
		
	}
	
	public void register(Person person) {

		if(personRepository.existsByEmail(person.getEmail())) {			
			throw new IllegalArgumentException("Já existe um usuário cadastrado com esse email!");
		}
		
		String password = person.getPassword();
		person.setPassword(passwordEncoder.encode(password));
		
		personRepository.save(person);
	}
	
}
