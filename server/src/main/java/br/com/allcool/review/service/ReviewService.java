package br.com.allcool.review.service;

import br.com.allcool.converter.ReviewDTOConverter;
import br.com.allcool.dto.ReviewDTO;
import br.com.allcool.review.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<ReviewDTO> findAllByProductId(UUID productId) {

        ReviewDTOConverter converter = new ReviewDTOConverter();

        return this.reviewRepository.findAllByProductId(productId).stream()
                .map(converter::to).collect(Collectors.toList());

    }
}
