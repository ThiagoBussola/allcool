package br.com.allcool.review.resource;

import br.com.allcool.dto.ReviewDTO;
import br.com.allcool.review.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/api/reviews")
public class ReviewResource {

    private final ReviewService service;

    public ReviewResource(ReviewService service) {
        this.service = service;
    }

    @GetMapping("/{productId}")
    public ResponseEntity<List<ReviewDTO>> findAllByProductId(@PathVariable("productId") UUID id) {

        return ResponseEntity.ok(this.service.findAllByProductId(id));
    }
}
