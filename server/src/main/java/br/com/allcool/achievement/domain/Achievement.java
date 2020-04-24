package br.com.allcool.achievement.domain;

import br.com.allcool.enums.AchievementTypeEnum;
import br.com.allcool.file.domain.File;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.Length;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "achievement")
@EqualsAndHashCode(of = "id")
public class Achievement {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private UUID id;

    @NotNull
    @OneToOne
    @JoinColumn(name = "file_id")
    private File file;

    @NotBlank
    @Length(max = 30)
    private String title;

    @NotBlank
    @Length(max = 200)
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AchievementTypeEnum type;

    @OneToMany(mappedBy = "achievement", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AchievementProductType> productTypes = new ArrayList<>();
}
