package br.com.allcool.product.service;

import br.com.allcool.dto.ProductDTO;
import br.com.allcool.product.domain.Product;
import br.com.allcool.product.repository.ProductRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class ProductServiceTest {

    @InjectMocks
    private ProductService service;

    @Mock
    private ProductRepository repository;

    @Test
    public void findById(){

        UUID id = UUID.randomUUID();

        when(this.repository.findById(id)).thenReturn(Optional.of(new Product()));

        this.service.findById(id);

        verify(this.repository).findById(id);
        verifyNoMoreInteractions(this.repository);

    }

    @Test
    public void findAll() {

        when(this.repository.findAll()).thenReturn(Collections.singletonList(new Product()));

        this.service.findAll();

        verify(this.repository).findAll();
        verifyNoMoreInteractions(this.repository);
    }
}
