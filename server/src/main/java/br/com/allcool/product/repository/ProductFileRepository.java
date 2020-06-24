package br.com.allcool.product.repository;

import br.com.allcool.product.domain.ProductFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProductFileRepository extends JpaRepository<ProductFile, UUID> {

    ProductFile findOneByProductIdAndListedTrue(UUID productId);
}
