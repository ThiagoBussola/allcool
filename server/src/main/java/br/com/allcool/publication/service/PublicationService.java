package br.com.allcool.publication.service;

import br.com.allcool.publication.domain.Publication;
import br.com.allcool.publication.repository.PublicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublicationService {

    private final PublicationRepository repository;

    public PublicationService(PublicationRepository repository) {

        this.repository = repository;
    }

    public List<Publication> findAll() {

        return this.repository.findAll();
    }
}
