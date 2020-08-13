package br.com.allcool.publication.repository;

import br.com.allcool.enums.PublicationTypeEnum;
import br.com.allcool.publication.domain.Publication;
import br.com.allcool.review.domain.Review;
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
@Sql(scripts = {"/sql/person/person.sql", "/sql/file/file.sql", "/sql/brand/brand.sql", "/sql/user/userclient.sql",
        "/sql/producttype/producttype.sql", "/sql/product/product.sql", "/sql/product/productflavor.sql",
        "/sql/review/review.sql", "/sql/publication/publications.sql"})
public class PublicationRepositoryTest {

    @Autowired
    private PublicationRepository repository;

    private final UUID PUBLICATION_ID = UUID.fromString("8dbea354-d66c-483e-b34f-2d3df117c933");

    @Test
    public void findAll() {

        List<Publication> addressList = this.repository.findAll();

        assertThat(addressList).hasSize(1);
        assertThat(addressList).extracting(Publication::getReview).extracting(Review::getId)
                .containsExactly(UUID.fromString("d6353fa6-796e-4fca-aa11-d731633782dd"));
        assertThat(addressList).extracting(Publication::getNews).containsOnlyNulls();
    }

    @Test
    public void delete() {

        List<Publication> publicationListBeforeDelete = this.repository.findAll();

        assertThat(publicationListBeforeDelete).hasSize(1);

        this.repository.deleteById(PUBLICATION_ID);

        List<Publication> publicationListAfterDelete = this.repository.findAll();

        assertThat(publicationListAfterDelete).hasSize(0);
    }

    @Test
    public void save() {

        Review review = new Review();
        review.setId(UUID.fromString("d8942a4c-183a-4261-83ff-6c466e5ced8f"));

        Publication publication = new Publication();
        publication.setReview(review);
        publication.setType(PublicationTypeEnum.REVIEW);

        Publication savedPublication = this.repository.saveAndFlush(publication);

        assertThat(savedPublication.getId()).isNotNull();
        assertThat(savedPublication.getReview()).isEqualTo(review);
        assertThat(savedPublication.getType()).isEqualTo(publication.getType());
    }
}