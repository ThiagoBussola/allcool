package br.com.allcool.review.service;

import br.com.allcool.dto.ReviewDTO;
import br.com.allcool.file.domain.File;
import br.com.allcool.person.domain.Person;
import br.com.allcool.product.domain.Product;
import br.com.allcool.review.domain.Review;
import br.com.allcool.review.repository.ReviewRepository;
import br.com.allcool.user.domain.UserClient;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class ReviewServiceTest {

    @InjectMocks
    private ReviewService service;

    @Mock
    private ReviewRepository repository;

    @Test
    public void findAllByProductId() {

        File file = new File();
        file.setUrl("www.teste.com.br");

        Person person = new Person();
        person.setId(UUID.randomUUID());
        person.setName("Claudinho");

        UserClient userClient = new UserClient();
        userClient.setPerson(person);
        userClient.setFile(file);

        Product product = new Product();
        product.setName("Brahma Extra");

        Review review = new Review();
        review.setId(UUID.randomUUID());
        review.setDescription("Uma cerveja muito boa!");
        review.setRating(BigDecimal.valueOf(5));
        review.setUser(userClient);
        review.setProduct(product);
        review.setFile(file);

        when(this.repository.findAllByProductId(review.getId())).thenReturn(Collections.singletonList(review));

        List<ReviewDTO> result = this.service.findAllByProductId(review.getId());

        assertThat(result).extracting(ReviewDTO::getId).containsExactly(review.getId());
        assertThat(result).extracting(ReviewDTO::getUserName).containsExactly(userClient.getPerson().getName());
        assertThat(result).extracting(ReviewDTO::getProductName).containsExactly(product.getName());
        assertThat(result).extracting(ReviewDTO::getAvatarUrl).containsExactly(userClient.getFile().getUrl());
        assertThat(result).extracting(ReviewDTO::getDescription).containsExactly(review.getDescription());
        assertThat(result).extracting(ReviewDTO::getRating).containsExactly(review.getRating());

        verify(this.repository).findAllByProductId(review.getId());
        verifyNoMoreInteractions(this.repository);
    }
}
