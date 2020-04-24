package br.com.allcool.review;

import br.com.allcool.file.domain.File;
import br.com.allcool.user.domain.UserClient;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.Length;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "review")
@EqualsAndHashCode(of = {"id", "userClient"})
public class Review {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private UUID id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userclient_id")
    private UserClient userClient;

    //TODO - PRODUTO

    @NotNull
    @OneToOne
    @JoinColumn(name = "file_id")
    private File file;

    @NotNull
    @Length(max = 200)
    private String description;

    @NotNull
    private BigDecimal rating;

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReviewProductFlavor> flavors = new ArrayList<>();
}
