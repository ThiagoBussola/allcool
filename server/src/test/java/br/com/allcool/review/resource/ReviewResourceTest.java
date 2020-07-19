package br.com.allcool.review.resource;

import br.com.allcool.dto.ReviewFormDTO;
import br.com.allcool.review.domain.Review;
import br.com.allcool.review.service.ReviewService;
import br.com.allcool.test.ResourceTest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.util.UUID;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@ResourceTest(ReviewResource.class)
public class ReviewResourceTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ReviewService service;

    @Test
    public void saveReview() throws Exception {

        ReviewFormDTO dto = new ReviewFormDTO();

        when(this.service.saveReview(dto)).thenReturn(new Review());

        this.mockMvc.perform(post("/api/reviews")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());

        verify(this.service).saveReview(dto);
        verifyNoMoreInteractions(this.service);
    }

    @Test
    public void isProductReviewed() throws Exception {

        UUID productId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();

        when(this.service.isProductReviewed(userId, productId)).thenReturn(true);

        this.mockMvc.perform(
                get("/api/reviews/products/{productId}/users/{userId}/verify-user-review",
                        productId, userId))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", equalTo(true)));

        verify(this.service).isProductReviewed(userId, productId);
        verifyNoMoreInteractions(this.service);
    }
}