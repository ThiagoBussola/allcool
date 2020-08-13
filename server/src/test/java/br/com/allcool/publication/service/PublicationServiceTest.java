package br.com.allcool.publication.service;

import br.com.allcool.publication.domain.Publication;
import br.com.allcool.publication.repository.PublicationRepository;
import br.com.allcool.review.domain.Review;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Collections;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class PublicationServiceTest {

    @Mock
    private PublicationRepository repository;

    @InjectMocks
    private PublicationService service;

    @Test
    public void findAll() {

        Publication publication = new Publication(new Review());

        when(this.repository.findAll()).thenReturn(Collections.singletonList(publication));

        this.service.findAll();

        verify(this.repository).findAll();
        verifyNoMoreInteractions(this.repository);
    }
}