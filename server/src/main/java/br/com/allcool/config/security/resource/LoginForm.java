package br.com.allcool.config.security.resource;

import lombok.Data;

@Data
public class LoginForm {

	private String email;
	private String password;
}
