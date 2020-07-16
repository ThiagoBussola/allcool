package br.com.allcool.converter;

import br.com.allcool.dto.ReviewDTO;
import br.com.allcool.review.domain.Review;

import static java.util.Objects.isNull;

public class ReviewDTOConverter {

    public ReviewDTO to(Review review) {
        ReviewDTO dto = new ReviewDTO();

        if (isNull(review)) {
            return dto;
        }

        dto.setId(review.getId());
        dto.setUserName(review.getUser().getPerson().getName());
        dto.setProductName(review.getProduct().getName());
        dto.setAvatarUrl(review.getFile().getUrl());
        dto.setDescription(review.getDescription());
        dto.setRating(review.getRating());

        return dto;
    }
}
