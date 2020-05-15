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

@RestController
@RequestMapping("/login")
public class AuthenticationResource {
	
	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private TokenService tokenService;

	@PostMapping
	public ResponseEntity<TokenDTO> autenticar(@RequestBody @Valid LoginForm login){ //
		
		UsernamePasswordAuthenticationToken dadosLogin = new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword());	
		
		try {
			
			System.out.println(login.getEmail());
			System.out.println(login.getPassword());
			Authentication auth = authManager.authenticate(dadosLogin); // spring sabe que tem que chamar o auth service
			String token = tokenService.gerarToken(auth);
			
			return ResponseEntity.ok(new TokenDTO(token, "Bearer"));
			
		} catch (AuthenticationException e) {
			
			return ResponseEntity.badRequest().build();
		}
		
	}
}
