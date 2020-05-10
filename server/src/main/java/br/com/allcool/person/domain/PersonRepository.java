package br.com.allcool.person.domain;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, UUID>{

	Optional<Person> findByEmail(String email);
}
