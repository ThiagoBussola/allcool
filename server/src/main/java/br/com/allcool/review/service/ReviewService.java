package br.com.allcool.review.service;

import br.com.allcool.converter.ReviewDTOConverter;
import br.com.allcool.dto.ReviewDTO;
import br.com.allcool.converter.ReviewFormDTOConverter;
import br.com.allcool.dto.ReviewFormDTO;
import br.com.allcool.exception.CreationNotPermittedException;
import br.com.allcool.exception.DataNotFoundException;
import br.com.allcool.review.domain.Review;
import br.com.allcool.review.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import static java.util.Objects.isNull;

@Service
@Transactional(readOnly = true)
public class ReviewService {

    private final ReviewRepository repository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.repository = reviewRepository;
    }

    public List<ReviewDTO> findAllByProductId(UUID productId) {

        ReviewDTOConverter converter = new ReviewDTOConverter();

        return this.repository.findAllByProductId(productId).stream()
                .map(converter::to).collect(Collectors.toList());

    }

    private void verifyReviewFormDTOConsistency(ReviewFormDTO dto) {

        if (isNull(dto.getProductId())) {
            throw new CreationNotPermittedException("Registro sem produto vínculado. Atualize e tente novamente.");
        }

        if (isNull(dto.getUserClientId())) {
            throw new CreationNotPermittedException("Registro sem usuário vínculado. Atualize e tente novamente.");
        }

        if (dto.getFlavors().isEmpty()) {
            throw new CreationNotPermittedException("Nenhum sabor foi selecionado.");
        }

        if (this.repository.existsByUserIdAndProductId(dto.getUserClientId(), dto.getProductId())) {
            throw new CreationNotPermittedException("O usuário logado já fez uma avaliação para o produto selecionado.");
        }
    }

    public Review saveReview(ReviewFormDTO dto) {

        this.verifyReviewFormDTOConsistency(dto);

        return this.repository.save(new ReviewFormDTOConverter().from(dto));
    }

    @Transactional(readOnly = true)
    public Boolean isProductReviewed(UUID userId, UUID productId) {

        return this.repository.existsByUserIdAndProductId(userId, productId);
    }

    @Transactional(readOnly = true)
    public ReviewDTO findById(UUID id) {

        return new ReviewDTOConverter().to(this.repository.findById(id).orElseThrow(DataNotFoundException::new));
    }
}
