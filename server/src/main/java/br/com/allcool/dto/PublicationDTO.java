package br.com.allcool.dto;

import br.com.allcool.enums.PublicationTypeEnum;
import br.com.allcool.news.domain.News;
import br.com.allcool.review.domain.Review;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
public class PublicationDTO {

    private UUID id;
    private ReviewDTO review;
    private News news;
    private PublicationTypeEnum type;
}
