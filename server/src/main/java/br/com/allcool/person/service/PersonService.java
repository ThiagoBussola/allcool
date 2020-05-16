package br.com.allcool.person.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.allcool.person.domain.Person;
import br.com.allcool.person.repository.PersonRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PersonService {

	private final PersonRepository personRepository;
	
	public Person register(Person person) {
		
		if(personRepository.existsByEmail(person.getEmail())) {			
			throw new IllegalArgumentException("Já existe um usuário cadastrado com esse email!");
		}
		
		String password = person.getPassword();
		person.setPassword(setEncoderToPassword(password));
		
		return personRepository.save(person);
	}
	
	private String setEncoderToPassword(String password) {	
		return new BCryptPasswordEncoder().encode(password);
	}
	
}
