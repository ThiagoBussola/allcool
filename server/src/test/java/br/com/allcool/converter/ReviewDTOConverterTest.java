package br.com.allcool.converter;

import br.com.allcool.dto.ReviewDTO;
import br.com.allcool.file.domain.File;
import br.com.allcool.product.domain.Product;
import br.com.allcool.review.domain.Review;
import br.com.allcool.user.domain.UserClient;
import org.junit.Test;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

public class ReviewDTOConverterTest {

    private final ReviewDTOConverter dtoConverter = new ReviewDTOConverter();

    @Test
    public void to() {

        Review review = new Review();
        review.setId(UUID.randomUUID());
        review.setDescription("Uma cerveja muito boa!");

        UserClient userClient = new UserClient();
        userClient.getPerson().setName("Claudinho");
        userClient.getFile().setUrl("32f5d633-c094-46d8-826e-d799572d7610");

        Product product = new Product();
        product.setName("Brahma Extra");

        File file = new File();
        file.setUrl("teste.com");

        ReviewDTO dto = this.dtoConverter.to(review);

        assertThat(dto.getId()).isEqualTo(review.getId());
        assertThat(dto.getUserName()).isEqualTo(review.getUser());
        assertThat(dto.getProductName()).isEqualTo(review.getProduct());
        assertThat(dto.getAvatarUrl()).isEqualTo(review.getFile());
        assertThat(dto.getDescription()).isEqualTo(review.getDescription());
        assertThat(dto.getRating()).isEqualTo(review.getRating());
    }
}
