package br.com.allcool.config.security.service;

import java.util.Date;


import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import br.com.allcool.person.domain.Person;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TokenService {

	private static final String EXPIRATION = "86400000"; // 1 dia em milsegundos
	// colocar fora do codigo
	private static final String SECRET = "!@N=Ke!~p8VTA2ZRK~nMDQX5Uvm!m'D&]{@Vr?G;2?XhbC:Qa#9#eMLN\\}x3?JR3.2zr~v)gYF^8\\:8>:XfB:Ww75N/emt9Yj[bQMNCWwW\\J?N,nvH.<2\\.r~w]*e~vgak)X\"v8H`MH/7\"2E`,^k@n<vE-wD3g9JWPy;CrY*.Kd2_D])=><D?YhBaSua5hW%{2]_FVXzb9`8FH^b[X3jzVER&:jw2<=c38=>L/zBq`}C6tT*cCSVC^c]-L}&/";
	
	public String gerarToken(Authentication auth) {
		
		Person logado = (Person) auth.getPrincipal();
		Date hoje = new Date();
		Date dataExpiracao = new Date(hoje.getTime() + Long.parseLong(EXPIRATION));
		
		return Jwts.builder()
				.setIssuer("API - AllCool")
				.setSubject(logado.getId().toString())
				.setIssuedAt(hoje)
				.setExpiration(dataExpiracao)
				.signWith(SignatureAlgorithm.HS256, SECRET)
				.compact();
	}
	
	public Boolean isTokenValid(String token) {
		
		try {
			
			Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
			return Boolean.TRUE;
			
		} catch (Exception e) {
			
			return Boolean.FALSE;
		}

	}

	public String getIdPerson(String token) {
		
		Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
		return claims.getSubject();

	}
}