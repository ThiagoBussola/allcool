package br.com.allcool.product.domain;

import br.com.allcool.producttype.domain.ProductType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.Length;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "product")
@EqualsAndHashCode(of = "id")
public class Product {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private UUID id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "producttype_id")
    private ProductType type;

    @NotNull
    private Long code;

    @NotBlank
    @Length(max = 100)
    @Column(name = "productname")
    private String name;

    @NotBlank
    @Length(max = 2000)
    private String description;

    @NotNull
    @Length(max = 400)
    private String harmonization;

    @NotNull
    private Boolean active = Boolean.TRUE;

    @NotEmpty
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductContainer> containers = new ArrayList<>();

    @NotEmpty
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductFlavor> flavors = new ArrayList<>();
}
