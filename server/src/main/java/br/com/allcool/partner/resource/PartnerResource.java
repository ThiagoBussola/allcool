package br.com.allcool.partner.resource;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.allcool.dto.PartnerDTO;
import br.com.allcool.partner.service.PartnerService;

@RestController
@RequestMapping("/api/partners")
public class PartnerResource {

	private final PartnerService service;
	
	public PartnerResource(PartnerService service) {
		this.service = service;
	}
	
    @GetMapping
    public ResponseEntity<List<PartnerDTO>> findAll() {

        return ResponseEntity.ok(this.service.findAll());
    }
}
