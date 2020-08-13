package br.com.allcool.review.service;

import br.com.allcool.converter.ReviewFormDTOConverter;
import br.com.allcool.dto.ReviewFormDTO;
import br.com.allcool.exception.CreationNotPermittedException;
import br.com.allcool.publication.domain.Publication;
import br.com.allcool.publication.repository.PublicationRepository;
import br.com.allcool.review.domain.Review;
import br.com.allcool.review.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import static java.util.Objects.isNull;

@Service
@Transactional
public class ReviewService {

    private final ReviewRepository repository;
    private final PublicationRepository publicationRepository;

    public ReviewService(ReviewRepository repository, PublicationRepository publicationRepository) {
        this.repository = repository;
        this.publicationRepository = publicationRepository;
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

        Review review = this.repository.saveAndFlush(new ReviewFormDTOConverter().from(dto));

        this.publicationRepository.save(new Publication(review));

        return review;
    }

    @Transactional(readOnly = true)
    public Boolean isProductReviewed(UUID userId, UUID productId) {

        return this.repository.existsByUserIdAndProductId(userId, productId);
    }
}
