package br.com.allcool.achievement.service;

import br.com.allcool.achievement.repository.AchievementRepository;
import br.com.allcool.converter.AchievementDTOConverter;
import br.com.allcool.dto.AchievementDTO;
import br.com.allcool.user.repository.UserClientAchievementRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class AchievementService {

    private final AchievementRepository repository;

    private final UserClientAchievementRepository userClientAchievementRepository;

    public AchievementService(AchievementRepository achievementRepository, UserClientAchievementRepository userClientAchievementRepository) {
        this.repository = achievementRepository;
        this.userClientAchievementRepository = userClientAchievementRepository;
    }

    public List<AchievementDTO> findAllAchievementByProductId(UUID productId) {

        AchievementDTOConverter converter = new AchievementDTOConverter();

        return this.repository.findAllAchievementByProductId(productId).stream()
                .map(converter::to).collect(Collectors.toList());
    }

    public Long countByProductId(UUID productId) {

        return repository.countByProductId(productId);

    }

    public Long countByUserId(UUID userId) {

        return userClientAchievementRepository.countByUserId(userId);
    }

}
