package br.com.allcool.news.domain;

import br.com.allcool.address.domain.Address;
import br.com.allcool.enums.NewsTypeEnum;
import br.com.allcool.file.domain.File;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "news")
@EqualsAndHashCode(of = "id")
public class News {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "file_id")
    private File file;

    @NotBlank
    @Length(max = 1000)
    private String description;

    @NotNull
    private Long rating;

    @NotNull
    @Column(name = "creationdate")
    private LocalDate creationDate;

    @NotNull
    @Column(name = "eventdate")
    private LocalDateTime eventDate;

    @Enumerated(EnumType.STRING)
    private NewsTypeEnum type;
}