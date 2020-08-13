package br.com.allcool.publication.resource;

import br.com.allcool.news.domain.News;
import br.com.allcool.publication.domain.Publication;
import br.com.allcool.publication.service.PublicationService;
import br.com.allcool.review.domain.Review;
import br.com.allcool.test.ResourceTest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.util.Arrays;
import java.util.UUID;

import static org.hamcrest.CoreMatchers.hasItems;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@ResourceTest(PublicationResource.class)
public class PublicationResourceTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PublicationService service;

    @Test
    public void findAll() throws Exception {

        Review review = new Review();
        review.setId(UUID.randomUUID());

        Publication publicationReview = new Publication(review);
        publicationReview.setId(UUID.randomUUID());

        News news = new News();
        news.setId(UUID.randomUUID());

        Publication publicationNews = new Publication(news);
        publicationNews.setId(UUID.randomUUID());

        when(this.service.findAll()).thenReturn(Arrays.asList(publicationReview, publicationNews));

        this.mockMvc.perform(get("/api/publications"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[*].id",
                        hasItems(publicationReview.getId().toString(), publicationNews.getId().toString())))
                .andExpect(jsonPath("$.[*].type",
                        hasItems(publicationReview.getType().toString(), publicationNews.getType().toString())))
                .andExpect(jsonPath("$.[*].review.id",
                        hasItems(publicationReview.getReview().getId().toString())))
                .andExpect(jsonPath("$.[*].news.id",
                        hasItems(publicationNews.getNews().getId().toString())));

        verify(this.service).findAll();
        verifyNoMoreInteractions(this.service);
    }
}