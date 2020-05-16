package br.com.allcool.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import br.com.allcool.config.security.service.AuthenticationService;
import br.com.allcool.config.security.service.AuthenticationTokenFilter;
import br.com.allcool.config.security.service.TokenService;
import br.com.allcool.person.repository.PersonRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{

	@Autowired
	private AuthenticationService authenticationService;
	
	@Autowired
	private TokenService tokenService;
	
	@Autowired
	private PersonRepository personRepository;
	
	@Override
	@Bean
	protected AuthenticationManager authenticationManager() throws Exception {
		return super.authenticationManager();
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		
		auth.userDetailsService(authenticationService).passwordEncoder(new BCryptPasswordEncoder());
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		http.authorizeRequests()
			.antMatchers(HttpMethod.POST, "/login").permitAll()
			.anyRequest().authenticated()
			.and()
			.csrf().disable()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//			.and()
//			.addFilterBefore(new AuthenticationTokenFilter(tokenService, personRepository), UsernamePasswordAuthenticationFilter.class);

	}
	
	// Recursos estáticos (imagens)
	@Override
	public void configure(WebSecurity web) throws Exception {
		super.configure(web);
	}

}
