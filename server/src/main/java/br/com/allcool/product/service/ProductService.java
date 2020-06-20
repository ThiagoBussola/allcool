package br.com.allcool.product.service;

import br.com.allcool.converter.ProductDTOConverter;
import br.com.allcool.dto.ProductDTO;
import br.com.allcool.exception.DataNotFoundException;
import br.com.allcool.product.domain.Product;
import br.com.allcool.product.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public Product findById(UUID id){

        return this.repository.findById(id).orElseThrow(DataNotFoundException::new);

    }

    public List<ProductDTO> findAll() {

        List<Product> products = this.repository.findAll();

        ProductDTOConverter converter = new ProductDTOConverter();
        List<ProductDTO> dtos = products.stream().map(converter::to).collect(Collectors.toList());

        return dtos;
    }

}
