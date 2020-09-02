package br.com.allcool.achievement.service;

import br.com.allcool.achievement.repository.AchievementRepository;
import br.com.allcool.converter.AchievementDTOConverter;
import br.com.allcool.dto.AchievementDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class AchievementService {

    private final AchievementRepository repository;

    public AchievementService(AchievementRepository achievementRepository) {
        this.repository = achievementRepository;
    }

    public List<AchievementDTO> findAllAchievementByProductId(UUID productId) {

        AchievementDTOConverter converter = new AchievementDTOConverter();

        return this.repository.findAllAchievementByProductId(productId).stream()
                .map(converter::to).collect(Collectors.toList());
    }
}
