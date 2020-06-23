package br.com.allcool.dto;

import br.com.allcool.product.domain.ProductFile;
import lombok.Data;

import java.util.UUID;

@Data
public class ProductDTO {

    private UUID id;
    private String type;
    private String brand;
    private String name;
    private ProductFile image;
}
