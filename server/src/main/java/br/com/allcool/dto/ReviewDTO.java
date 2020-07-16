package br.com.allcool.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {

    private UUID id;
    private String userName;
    private String productName;
    private String avatarUrl;
    private String description;
    private BigDecimal rating;
}
