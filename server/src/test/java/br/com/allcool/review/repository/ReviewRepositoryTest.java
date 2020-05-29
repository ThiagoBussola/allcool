package br.com.allcool.review.repository;

import br.com.allcool.review.domain.Review;
import br.com.allcool.test.RepositoryTest;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.UUID;

@RepositoryTest
@RunWith(SpringRunner.class)
@Sql(scripts = {"/sql/review/review.sql"})
@SuppressWarnings("OptionalGetWithoutIsPresent")
public class ReviewRepositoryTest {

    @Autowired
    private ReviewRepository repository;

    private final UUID REVIEW_ID =  UUID.fromString("d6353fa6-796e-4fca-aa11-d731633782dd");

    @Test
    public void findAll() {
        List<Review> reviewList = this.repository.findAll();

    }
}
