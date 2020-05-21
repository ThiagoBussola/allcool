package br.com.allcool.achievement.repository;

import br.com.allcool.achievement.domain.Achievement;
import br.com.allcool.achievement.domain.AchievementProductType;
import br.com.allcool.producttype.domain.ProductType;
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
@Sql(scripts = {"/sql/achievement/achievement.sql", "/sql/producttype/producttype.sql", "/sql/achievementproducttype/achievementproducttype.sql"})
@SuppressWarnings("OptionalGetWithoutIsPresent")
public class AchievementProductTypeRepositoryTest {

    @Autowired
    private AchievementProductTypeRepository repository;

    private final UUID ACHIEVEMENTPRODUCTTYPE_ID = UUID.fromString("81fe3846-9b10-11ea-bb37-0242ac130002");

    @Test
    public void findAll() {

        List<AchievementProductType> achievementProductTypeList = this.repository.findAll();

        assertThat(achievementProductTypeList).hasSize(2);
        assertThat(achievementProductTypeList).extracting(achievementProductType -> achievementProductType.getAchievement().getId()).containsExactly(UUID.fromString("ce583254-d732-4fe7-85fb-a11585399766"), UUID.fromString("fdb671cc-9b08-11ea-bb37-0242ac130002"));
        assertThat(achievementProductTypeList).extracting(achievementProductType -> achievementProductType.getProductType().getId()).containsExactly(UUID.fromString("d6a0ed3a-82b7-4c10-9190-27a737faf454"), UUID.fromString("256b6606-97b6-11ea-bb37-0242ac130002"));
    }

    @Test
    public void delete() {

        List<AchievementProductType> achievementProductTypeListBeforeDelete = this.repository.findAll();

        assertThat(achievementProductTypeListBeforeDelete).hasSize(2);

        this.repository.deleteById(ACHIEVEMENTPRODUCTTYPE_ID);

        List<AchievementProductType> achievementProductTypeListAfterDelete = this.repository.findAll();

        assertThat(achievementProductTypeListAfterDelete).hasSize(1);
    }

    @Test
    public void save() {

        Achievement achievement = new Achievement();
        achievement.setId(UUID.fromString("ce583254-d732-4fe7-85fb-a11585399766"));

        ProductType productType = new ProductType();
        productType.setId(UUID.fromString("d6a0ed3a-82b7-4c10-9190-27a737faf454"));

        AchievementProductType achievementProductType = new AchievementProductType();
        achievementProductType.setAchievement(achievement);
        achievementProductType.setProductType(productType);

        AchievementProductType savedAchievementProductType = this.repository.saveAndFlush(achievementProductType);

        assertThat(savedAchievementProductType.getId()).isNotNull();
        assertThat(savedAchievementProductType.getAchievement()).isEqualTo(achievementProductType.getAchievement());
        assertThat(savedAchievementProductType.getProductType()).isEqualTo(achievementProductType.getProductType());
    }

    @Test
    public void update() {

        Achievement achievement = new Achievement();
        achievement.setId(UUID.fromString("ce583254-d732-4fe7-85fb-a11585399766"));

        ProductType productType = new ProductType();
        productType.setId(UUID.fromString("d6a0ed3a-82b7-4c10-9190-27a737faf454"));


        AchievementProductType achievementProductTypeBeforeUpdate = this.repository.findById(ACHIEVEMENTPRODUCTTYPE_ID).get();

        assertThat(achievementProductTypeBeforeUpdate.getId()).isEqualTo(ACHIEVEMENTPRODUCTTYPE_ID);
        assertThat(achievementProductTypeBeforeUpdate.getAchievement().getId()).isEqualTo(UUID.fromString("ce583254-d732-4fe7-85fb-a11585399766"));
        assertThat(achievementProductTypeBeforeUpdate.getProductType().getId()).isEqualTo(UUID.fromString("d6a0ed3a-82b7-4c10-9190-27a737faf454"));


        //como Fazer esse Teste?????

        //achievementProductTypeBeforeUpdate.setDescription("");
        //achievementProductTypeBeforeUpdate.setRating(1L);

        AchievementProductType achievementProductTypeAfterUpdate = this.repository.saveAndFlush(achievementProductTypeBeforeUpdate);

        assertThat(achievementProductTypeAfterUpdate.getId()).isEqualTo(ACHIEVEMENTPRODUCTTYPE_ID);
        assertThat(achievementProductTypeAfterUpdate.getAchievement().getId()).isEqualTo(UUID.fromString("c610a5c3-9746-43be-a1e4-5435411b0328"));
        assertThat(achievementProductTypeAfterUpdate.getProductType().getId()).isEqualTo(UUID.fromString("ce396aea-963e-11ea-bb37-0242ac130002"));

    }
}