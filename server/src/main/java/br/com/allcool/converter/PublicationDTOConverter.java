package br.com.allcool.converter;

import br.com.allcool.dto.PublicationDTO;
import br.com.allcool.publication.domain.Publication;

import static java.util.Objects.nonNull;

public class PublicationDTOConverter {

    private final ReviewDTOConverter reviewDTOConverter = new ReviewDTOConverter();

    public PublicationDTO to(Publication publication) {
        PublicationDTO dto = new PublicationDTO();

        if (publication == null) {
            return dto;
        }

        dto.setId(publication.getId());
        dto.setType(publication.getType());

        if (nonNull(publication.getReview())) {
            dto.setReview(reviewDTOConverter.to(publication.getReview()));
        }

        if (nonNull(publication.getNews())) {
            dto.setNews(publication.getNews());
        }

        return dto;
    }
}
