package br.com.allcool.config.security.service;

import java.io.IOException;
import java.util.UUID;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.util.Strings;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import br.com.allcool.person.domain.Person;
import br.com.allcool.person.repository.PersonRepository;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class AuthenticationTokenFilter extends OncePerRequestFilter { // chamado unica vez a cada requisicao

	private TokenService tokenService;
	private PersonRepository personRepository;

	// pegar token do cabecalho e verificar se esta ok
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String token = recuperarToken(request);
		
		Boolean validToken = tokenService.isTokenValid(token);
		
		if(Boolean.TRUE.equals(validToken)) { // verifica se o token eh valido para continuar com a req
			authenticatePerson(token);
		}
		filterChain.doFilter(request, response); // seguir fluxo da requisicao
		
	}
	
	private String recuperarToken(HttpServletRequest request) {
		
		String token = request.getHeader("Authorization");
		
		if(Strings.isBlank(token) || token.startsWith("Bearer ")) {
			
			return null;
		}
		
		return token.substring(7, token.length());
	}
	
	private void authenticatePerson(String token) {
		
		UUID idPerson = UUID.fromString(tokenService.getIdPerson(token));
		
		Person person = personRepository.findById(idPerson).get();
		
		UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(person, null, person.getAuthorities());
		
		SecurityContextHolder.getContext().setAuthentication(auth);
	}

}
