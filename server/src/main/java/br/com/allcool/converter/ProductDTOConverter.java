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
        dto.setType(product.getType());
        dto.setName(product.getName());

        return dto;
    }
}
