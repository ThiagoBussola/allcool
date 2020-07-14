package br.com.allcool.user.repository;

import br.com.allcool.user.domain.UserClient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserClientRepository extends JpaRepository<UserClient, UUID> {
	
	UserClient findByPersonId(UUID id);
}
