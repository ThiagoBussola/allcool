package br.com.allcool.review.resource;

import br.com.allcool.dto.ReviewFormDTO;
import br.com.allcool.review.domain.Review;
import br.com.allcool.review.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

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

    @GetMapping("/products/{productId}/users/{userId}/verify-user-review")
    public ResponseEntity<Boolean> isProductReviewed(
            @PathVariable("productId") UUID productId, @PathVariable("userId") UUID userId) {

        return ResponseEntity.ok(service.isProductReviewed(userId, productId));
    }

    @GetMapping("/id")
    public ResponseEntity<Review> findById(@PathVariable("id") UUID id) {

        return ResponseEntity.ok(this.service.findByID(id));
    }

}
