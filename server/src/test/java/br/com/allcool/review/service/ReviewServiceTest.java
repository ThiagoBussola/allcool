package br.com.allcool.review.service;

import br.com.allcool.converter.ReviewFormDTOConverter;
import br.com.allcool.dto.ProductFlavorDTO;
import br.com.allcool.dto.ReviewFormDTO;
import br.com.allcool.enums.FlavorTypeEnum;
import br.com.allcool.exception.CreationNotPermittedException;
import br.com.allcool.review.domain.Review;
import br.com.allcool.review.repository.ReviewRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class ReviewServiceTest {

    private final ReviewFormDTOConverter dtoConverter = new ReviewFormDTOConverter();

    @Mock
    private ReviewRepository repository;

    @InjectMocks
    private ReviewService service;

    @Test
    public void saveReview() {

        ProductFlavorDTO productFlavorDTO = new ProductFlavorDTO();
        productFlavorDTO.setDescription("Flavor 1");
        productFlavorDTO.setType(FlavorTypeEnum.SWEET);

        ReviewFormDTO dto = new ReviewFormDTO();
        dto.setDescription("Great beer");
        dto.setFlavors(Collections.singletonList(productFlavorDTO));
        dto.setProductId(UUID.randomUUID());
        dto.setUserClientId(UUID.randomUUID());
        dto.setRating(BigDecimal.valueOf(5));

        Review review = dtoConverter.from(dto);

        when(this.repository.existsByUserIdAndProductId(dto.getUserClientId(), dto.getProductId())).thenReturn(false);
        when(this.repository.save(review)).thenReturn(review);

        this.service.saveReview(dto);

        verify(this.repository).existsByUserIdAndProductId(dto.getUserClientId(), dto.getProductId());
        verify(this.repository).save(review);
        verifyNoMoreInteractions(this.repository);
    }

    @Test
    public void saveReviewNoProductIdException() {

        ProductFlavorDTO productFlavorDTO = new ProductFlavorDTO();
        productFlavorDTO.setDescription("Flavor 1");
        productFlavorDTO.setType(FlavorTypeEnum.SWEET);

        ReviewFormDTO dto = new ReviewFormDTO();
        dto.setDescription("Great beer");
        dto.setFlavors(Collections.singletonList(productFlavorDTO));
        dto.setUserClientId(UUID.randomUUID());
        dto.setRating(BigDecimal.valueOf(5));

        Exception exception = assertThrows(CreationNotPermittedException.class, () -> this.service.saveReview(dto));

        assertThat(exception.getMessage())
                .isEqualTo("Não foi possível salvar o registro. Motivo: Registro sem produto vínculado. Atualize e tente novamente.");
    }

    @Test
    public void saveReviewNoUserIdException() {

        ProductFlavorDTO productFlavorDTO = new ProductFlavorDTO();
        productFlavorDTO.setDescription("Flavor 1");
        productFlavorDTO.setType(FlavorTypeEnum.SWEET);

        ReviewFormDTO dto = new ReviewFormDTO();
        dto.setDescription("Great beer");
        dto.setFlavors(Collections.singletonList(productFlavorDTO));
        dto.setProductId(UUID.randomUUID());
        dto.setRating(BigDecimal.valueOf(5));

        Exception exception = assertThrows(CreationNotPermittedException.class, () -> this.service.saveReview(dto));

        assertThat(exception.getMessage())
                .isEqualTo("Não foi possível salvar o registro. Motivo: Registro sem usuário vínculado. Atualize e tente novamente.");
    }

    @Test
    public void saveReviewNoFlavorsSelectedException() {

        ReviewFormDTO dto = new ReviewFormDTO();
        dto.setDescription("Great beer");
        dto.setProductId(UUID.randomUUID());
        dto.setUserClientId(UUID.randomUUID());
        dto.setRating(BigDecimal.valueOf(5));

        Exception exception = assertThrows(CreationNotPermittedException.class, () -> this.service.saveReview(dto));

        assertThat(exception.getMessage())
                .isEqualTo("Não foi possível salvar o registro. Motivo: Nenhum sabor foi selecionado.");
    }

    @Test
    public void saveReviewExistsRegisterWithSameUserIdAndProductIdException() {

        ProductFlavorDTO productFlavorDTO = new ProductFlavorDTO();
        productFlavorDTO.setDescription("Flavor 1");
        productFlavorDTO.setType(FlavorTypeEnum.SWEET);

        ReviewFormDTO dto = new ReviewFormDTO();
        dto.setDescription("Great beer");
        dto.setFlavors(Collections.singletonList(productFlavorDTO));
        dto.setProductId(UUID.randomUUID());
        dto.setUserClientId(UUID.randomUUID());
        dto.setRating(BigDecimal.valueOf(5));

        when(this.repository.existsByUserIdAndProductId(dto.getUserClientId(), dto.getProductId())).thenReturn(true);

        Exception exception = assertThrows(CreationNotPermittedException.class, () -> this.service.saveReview(dto));

        assertThat(exception.getMessage())
                .isEqualTo("Não foi possível salvar o registro. Motivo: O usuário logado já fez uma avaliação para o produto selecionado.");

        verify(this.repository).existsByUserIdAndProductId(dto.getUserClientId(), dto.getProductId());
        verifyNoMoreInteractions(this.repository);
    }

    @Test
    public void isProductReviewed() {

        UUID userId = UUID.randomUUID();
        UUID productId = UUID.randomUUID();

        when(this.repository.existsByUserIdAndProductId(userId, productId)).thenReturn(true);

        Boolean result = this.service.isProductReviewed(userId, productId);

        assertThat(result).isTrue();

        verify(this.repository).existsByUserIdAndProductId(userId, productId);
        verifyNoMoreInteractions(this.repository);
    }

    @Test
    public void findById() {

        UUID id = UUID.randomUUID();

        when(this.repository.findById(id)).thenReturn(Optional.of(new Review()));

        this.service.findByID(id);

        verify(this.repository).findById(id);
        verifyNoMoreInteractions(this.repository);
    }

//    @Test
//    public void findByIdException() {
//
//
//        Exception exception = assertThrows(CreationNotPermittedException.class, () -> this.service.saveReview(dto));
//
//    }
}