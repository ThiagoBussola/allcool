package br.com.allcool.achievement.repository;

import br.com.allcool.achievement.domain.Achievement;
import br.com.allcool.enums.AchievementTypeEnum;
import br.com.allcool.file.domain.File;
import br.com.allcool.test.RepositoryTest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@RepositoryTest
@RunWith(SpringRunner.class)
@Sql(scripts = {"/sql/product/product.sql", "/sql/file/file.sql", "/sql/achievement/achievement.sql"})
@SuppressWarnings("OptionalGetWithoutIsPresent")
public class AchievementRepositoryTest {

    @Autowired
    private AchievementRepository repository;

    private final UUID ACHIEVEMENT_ID = UUID.fromString("ce583254-d732-4fe7-85fb-a11585399766");

    @Test
    public void findAll() {

        List<Achievement> achievementList = this.repository.findAll();

        assertThat(achievementList).hasSize(2);

        //Esperar até o eduardo terminar o Product para poder inserir os UUID corretos.
        //assertThat(achievementList).extracting(achievement -> achievement.getProduct().getId()).containsExactly(UUID.fromString("c610a5c3-9746-43be-a1e4-5435411b0328"), UUID.fromString("28fd5d3c-97b2-11ea-bb37-0242ac130002"));
        assertThat(achievementList).extracting(achievement -> achievement.getFile().getId()).containsExactly(UUID.fromString("ce396aea-963e-11ea-bb37-0242ac130002"), UUID.fromString("d33686e0-963e-11ea-bb37-0242ac130002"));
        assertThat(achievementList).extracting(Achievement::getTitle).containsExactly("Mestre Cervejeiro", "Lord of the Lager");
        assertThat(achievementList).extracting(Achievement::getDescription).containsExactly("Você alcançou está entre os maiores cervejeiros do allcool!", "Você realmente aprecia uma boa Lager!");
        assertThat(achievementList).extracting(Achievement::getType).containsExactly(AchievementTypeEnum.PRODUCT, AchievementTypeEnum.PRODUCT_TYPE);
    }

    @Test
    public void delete() {

        List<Achievement> achievementListBeforeDelete = this.repository.findAll();

        assertThat(achievementListBeforeDelete).hasSize(2);

        this.repository.deleteById(ACHIEVEMENT_ID);

        List<Achievement> achievementListAfterDelete = this.repository.findAll();

        assertThat(achievementListAfterDelete).hasSize(1);
    }

    @Test
    public void save() {

// Esperar o Eduardo e os Produtos
//        Product product = new Product();
//        product.setId(UUID.fromString("c610a5c3-9746-43be-a1e4-5435411b0328"));

        File file = new File();
        file.setId(UUID.fromString("ce396aea-963e-11ea-bb37-0242ac130002"));

        Achievement achievement = new Achievement();
        //achievement.setProduct(product);
        achievement.setFile(file);
        achievement.setTitle("Master of Ipa");
        achievement.setDescription("Somente os fortes chegam aqui!");
        achievement.setType(AchievementTypeEnum.PRODUCT);

        Achievement savedAchievement = this.repository.saveAndFlush(achievement);

        assertThat(savedAchievement.getId()).isNotNull();
        assertThat(savedAchievement.getProduct()).isEqualTo(achievement.getProduct());
        assertThat(savedAchievement.getFile()).isEqualTo(achievement.getFile());
        assertThat(savedAchievement.getTitle()).isEqualTo(achievement.getTitle());
        assertThat(savedAchievement.getDescription()).isEqualTo(achievement.getDescription());
        assertThat(savedAchievement.getType()).isEqualTo(achievement.getType());
    }

    @Test
    public void update() {

//        Product product = new Product();
//        product.setId(UUID.fromString("c610a5c3-9746-43be-a1e4-5435411b0328"));

        File file = new File();
        file.setId(UUID.fromString("ce396aea-963e-11ea-bb37-0242ac130002"));

        Achievement achievementBeforeUpdate = this.repository.findById(ACHIEVEMENT_ID).get();

        assertThat(achievementBeforeUpdate.getId()).isEqualTo(ACHIEVEMENT_ID);
        //assertThat(achievementBeforeUpdate.getProduct().getId()).isEqualTo(UUID.fromString("c610a5c3-9746-43be-a1e4-5435411b0328"));
        assertThat(achievementBeforeUpdate.getFile().getId()).isEqualTo(UUID.fromString("ce396aea-963e-11ea-bb37-0242ac130002"));
        assertThat(achievementBeforeUpdate.getTitle()).isEqualTo("Mestre Cervejeiro");
        assertThat(achievementBeforeUpdate.getDescription()).isEqualTo("Você alcançou está entre os maiores cervejeiros do allcool!");
        assertThat(achievementBeforeUpdate.getType()).isEqualTo(AchievementTypeEnum.PRODUCT);

        achievementBeforeUpdate.setDescription("O Mestre Cervejeiro");
        achievementBeforeUpdate.setDescription("Você alcançou está entre os maiores cervejeiros do allcool! Parabéns!");
        achievementBeforeUpdate.setType(AchievementTypeEnum.PRODUCT_TYPE);

        Achievement achievementAfterUpdate = this.repository.saveAndFlush(achievementBeforeUpdate);

        assertThat(achievementAfterUpdate.getId()).isEqualTo(ACHIEVEMENT_ID);
        //assertThat(achievementAfterUpdate.getProduct().getId()).isEqualTo(UUID.fromString("c610a5c3-9746-43be-a1e4-5435411b0328"));
        assertThat(achievementAfterUpdate.getFile().getId()).isEqualTo(UUID.fromString("ce396aea-963e-11ea-bb37-0242ac130002"));
        assertThat(achievementAfterUpdate.getTitle()).isEqualTo("O Mestre Cervejeiro");
        assertThat(achievementAfterUpdate.getDescription()).isEqualTo("Você alcançou está entre os maiores cervejeiros do allcool! Parabéns!");
        assertThat(achievementAfterUpdate.getType()).isEqualTo(AchievementTypeEnum.PRODUCT_TYPE);

    }
}