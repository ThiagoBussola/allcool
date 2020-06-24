package br.com.allcool.converter;

import br.com.allcool.dto.ProductDTO;
import br.com.allcool.product.domain.Product;

public class ProductDTOConverter {

    public ProductDTO to(Product product) {
        ProductDTO dto = new ProductDTO();

        if (product == null) {
            return dto;
        }

        dto.setId(product.getId());
        dto.setType(product.getType().getDescription());
        dto.setName(product.getName());
        dto.setBrand(product.getBrand().getName());

        return dto;
    }
}
