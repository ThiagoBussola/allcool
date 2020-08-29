package br.com.allcool.achievement.service;

import br.com.allcool.achievement.domain.Achievement;
import br.com.allcool.achievement.repository.AchievementRepository;
import br.com.allcool.converter.AchievementDTOConverter;
import br.com.allcool.dto.AchievementDTO;
import br.com.allcool.exception.DataNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class AchievementService {

    private final AchievementRepository repository;

    public AchievementService(AchievementRepository repository) {
        this.repository = repository;
    }

    public List<AchievementDTO> findAllByProductId(UUID productId) {

        AchievementDTOConverter converter = new AchievementDTOConverter();

        return this.repository.findAllByProductId(productId).stream()
                .map(converter::to).collect(Collectors.toList());
    }
}
