package br.com.allcool.config.security.resource;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.allcool.config.security.service.TokenService;
import br.com.allcool.person.domain.Person;
import br.com.allcool.person.service.PersonService;

@RestController
@RequestMapping("/login")
public class AuthenticationResource {
	
	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private TokenService tokenService;
	
	@Autowired
	private PersonService personService;

	@PostMapping
	public ResponseEntity<TokenDTO> login(@RequestBody @Valid LoginRequest login){
		
		UsernamePasswordAuthenticationToken dadosLogin = new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword());	
		
		try {
			
			Authentication auth = authManager.authenticate(dadosLogin);
			String token = tokenService.createToken(auth);
			return ResponseEntity.ok(new TokenDTO(token, "Bearer"));
			
		} catch (AuthenticationException e) {
			return ResponseEntity.badRequest().build();
		}
		
	}
	
//	@PostMapping("/register")
//	public ResponseEntity<Person> register(@RequestBody @Valid Person register){
//		
//		return ResponseEntity.ok(personService.register(register));
//	}
}
