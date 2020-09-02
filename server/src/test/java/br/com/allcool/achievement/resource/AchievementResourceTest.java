package br.com.allcool.achievement.resource;

import br.com.allcool.achievement.domain.Achievement;
import br.com.allcool.achievement.service.AchievementService;
import br.com.allcool.dto.AchievementDTO;
import br.com.allcool.enums.AchievementTypeEnum;
import br.com.allcool.review.resource.ReviewResource;
import br.com.allcool.test.ResourceTest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

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
@ResourceTest(AchievementResource.class)
public class AchievementResourceTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AchievementService service;

    @Test
    public void findAllAchievementByProductId() throws Exception {

        AchievementDTO achievement1DTO = new AchievementDTO();

        achievement1DTO.setId(UUID.randomUUID());
        achievement1DTO.setBrand("Becks");
        achievement1DTO.setBadgeUrl("10_cervejas_Ambev");
        achievement1DTO.setAchievementName("5 Bottles");
        achievement1DTO.setDescription("Parabéns! Você já experimentou 5 cervejas Ambev");

        AchievementDTO achievement2DTO = new AchievementDTO();

        achievement2DTO.setId(UUID.randomUUID());
        achievement2DTO.setBrand("Goose Island");
        achievement2DTO.setBadgeUrl("Rei_da_IPA");
        achievement2DTO.setAchievementName("Rei da IPA");
        achievement2DTO.setDescription("Você é um grande apreciador de IPAs!");

        List<AchievementDTO> achievementDTOList = new ArrayList<>();
        achievementDTOList.add(achievement1DTO);
        achievementDTOList.add(achievement2DTO);

        UUID productId = UUID.randomUUID();

        when(this.service.findAllAchievementByProductId(productId)).thenReturn(achievementDTOList);

        this.mockMvc.perform(get("/api/achievements/{productId}", productId))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[*].id", hasItems(achievement1DTO.getId().toString(),
                        achievement2DTO.getId().toString())))
                .andExpect(jsonPath("$.[*].brand", hasItems(achievement1DTO.getBrand(),
                        achievement2DTO.getBrand())))
                .andExpect(jsonPath("$.[*].badgeUrl", hasItems(achievement1DTO.getBadgeUrl(),
                        achievement2DTO.getBadgeUrl())))
                .andExpect(jsonPath("$.[*].achievementName", hasItems(achievement1DTO.getAchievementName(),
                        achievement2DTO.getAchievementName())))
                .andExpect(jsonPath("$.[*].description", hasItems(achievement1DTO.getDescription(),
                        achievement2DTO.getDescription())))
                .andExpect(jsonPath("$.[*].type", hasItems(achievement1DTO.getType(),
                        achievement2DTO.getType())));

        verify(this.service).findAllAchievementByProductId(productId);
        verifyNoMoreInteractions(this.service);

    }
}
