package br.com.allcool.publication.resource;

import br.com.allcool.publication.domain.Publication;
import br.com.allcool.publication.service.PublicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/publications")
public class PublicationResource {

    private final PublicationService service;

    public PublicationResource(PublicationService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Publication>> findAll() {

        return ResponseEntity.ok(this.service.findAll());
    }
}
