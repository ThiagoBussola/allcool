package br.com.allcool.product.service;

import br.com.allcool.exception.DataNotFoundException;
import br.com.allcool.product.domain.Product;
import br.com.allcool.product.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public Product findById(UUID id){

        return this.repository.findById(id).orElseThrow(DataNotFoundException::new);

    }

    public List<Product> findAll() {

        return this.repository.findAll();
    }

}
