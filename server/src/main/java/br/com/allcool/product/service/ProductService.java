package br.com.allcool.product.service;

import br.com.allcool.converter.ProductDTOConverter;
import br.com.allcool.dto.ProductDTO;
import br.com.allcool.exception.DataNotFoundException;
import br.com.allcool.product.domain.Product;
import br.com.allcool.product.repository.ProductFileRepository;
import br.com.allcool.product.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository repository;
    private final ProductFileRepository productFileRepository;

    public ProductService(ProductRepository repository, ProductFileRepository productFileRepository) {
        this.repository = repository;
        this.productFileRepository = productFileRepository;
    }

    public Product findById(UUID id) {

        return this.repository.findById(id).orElseThrow(DataNotFoundException::new);

    }

    //TO-DO Ajustar teste
    public List<ProductDTO> findAll() {

        ProductDTOConverter converter = new ProductDTOConverter();

        List<ProductDTO> productDTOList = this.repository.findAll().stream().map(converter::to).collect(Collectors.toList());

        productDTOList.forEach(p -> p.setImageUrl(this.productFileRepository.findOneByProductIdAndListedTrue(p.getId()).getFile().getUrl()));

        return productDTOList;
    }
}
