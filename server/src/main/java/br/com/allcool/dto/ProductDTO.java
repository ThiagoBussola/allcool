package br.com.allcool.dto;

import br.com.allcool.producttype.domain.ProductType;
import lombok.Data;

import java.util.UUID;

@Data
public class ProductDTO {

    private UUID id;
    private ProductType type;
    private String name;

}
