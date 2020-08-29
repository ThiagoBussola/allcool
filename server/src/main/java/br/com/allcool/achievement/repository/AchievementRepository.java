package br.com.allcool.achievement.repository;


import br.com.allcool.achievement.domain.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AchievementRepository extends JpaRepository<Achievement, UUID> {

    List<Achievement> findAllByProductId(UUID productId);
}
