package br.com.allcool.review.resource;

import br.com.allcool.dto.ReviewDTO;
import br.com.allcool.review.service.ReviewService;
import br.com.allcool.test.ResourceTest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.hamcrest.CoreMatchers.hasItems;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@ResourceTest(ReviewResource.class)
public class ReviewResourceTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReviewService service;

    @Test
    public void findAllByProductId() throws Exception {

        ReviewDTO review1DTO = new ReviewDTO();

        review1DTO.setId(UUID.randomUUID());
        review1DTO.setUserName("Marcelo Silva");
        review1DTO.setProductName("Goose IPA");
        review1DTO.setAvatarUrl("32f5d633-c094-46d8-826e-d799572d7610");
        review1DTO.setDescription("Uma ótima IPA, com aromas cítricos e sabor intenso mas suave.");
        review1DTO.setRating(BigDecimal.valueOf(5));

        ReviewDTO review2DTO = new ReviewDTO();

        review2DTO.setId(UUID.randomUUID());
        review2DTO.setUserName("Pedro Henrique");
        review2DTO.setProductName("Coruja Amber Lager");
        review2DTO.setAvatarUrl("fca353f0-4027-4d13-a2f6-a9ec218720a3");
        review2DTO.setDescription("Bem presente o malte tostado e bastante lúpulo");
        review2DTO.setRating(BigDecimal.valueOf(4));

        List<ReviewDTO> listReviewDTOS = new ArrayList<>();
        listReviewDTOS.add(review1DTO);
        listReviewDTOS.add(review2DTO);

        UUID productId = UUID.randomUUID();

        when(this.service.findAllByProductId(productId)).thenReturn(listReviewDTOS);

        this.mockMvc.perform(get("/api/reviews/{productId}", productId))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[*].id", hasItems(review1DTO.getId().toString(),
                        review2DTO.getId().toString())))
                .andExpect(jsonPath("$.[*].userName", hasItems(review1DTO.getUserName(),
                        review2DTO.getUserName())))
                .andExpect(jsonPath("$.[*].productName", hasItems(review1DTO.getProductName(),
                        review2DTO.getProductName())))
                .andExpect(jsonPath("$.[*].avatarUrl", hasItems(review1DTO.getAvatarUrl(),
                        review2DTO.getAvatarUrl())))
                .andExpect(jsonPath("$.[*].description", hasItems(review1DTO.getDescription(),
                        review2DTO.getDescription())))
                .andExpect(jsonPath("$.[*].rating", hasItems(5)));

        verify(this.service).findAllByProductId(productId);
        verifyNoMoreInteractions(this.service);

    }
}
