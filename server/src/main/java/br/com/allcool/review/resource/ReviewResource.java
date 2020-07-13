package br.com.allcool.review.resource;

import br.com.allcool.dto.ReviewFormDTO;
import br.com.allcool.review.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reviews")
public class ReviewResource {

    private final ReviewService service;

    public ReviewResource(ReviewService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Void> saveReview(@RequestBody ReviewFormDTO review) {

        this.service.saveReview(review);

        return ResponseEntity.ok().build();
    }
}
