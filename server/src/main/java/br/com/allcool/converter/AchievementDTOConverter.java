package br.com.allcool.converter;

import br.com.allcool.achievement.domain.Achievement;
import br.com.allcool.dto.AchievementDTO;
import br.com.allcool.product.domain.Product;

import static java.util.Objects.isNull;

public class AchievementDTOConverter {

    public AchievementDTO to(Achievement achievement) {

        AchievementDTO dto = new AchievementDTO();

        if (isNull(achievement)) {
            return dto;
        }

        dto.setId(achievement.getId());
        dto.setBadgeUrl(achievement.getFile().getUrl());
        dto.setBrand(achievement.getProduct().getBrand());
        dto.setAchievementName(achievement.getTitle());
        dto.setDescription(achievement.getDescription());
        dto.setType(achievement.getType());

        return dto;
    }

}
