package br.com.allcool.product.repository;

import br.com.allcool.container.domain.Container;
import br.com.allcool.product.domain.Product;
import br.com.allcool.product.domain.ProductContainer;
import br.com.allcool.product.domain.ProductFlavor;
import br.com.allcool.producttype.domain.ProductType;
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
@Sql(scripts = {"/sql/container/container.sql", "/sql/producttype/producttype.sql", "/sql/product/product.sql"})
@SuppressWarnings("OptionalGetWithoutIsPresent")
public class ProductRepositoryTest {

    @Autowired
    private ProductRepository repository;

    @Autowired
    private ProductContainerRepository productContainerRepository;

    private final UUID PRODUCT_ID = UUID.fromString("14d304d3-c965-4875-8f53-86d20bb7d0aa");

    @Test
    public void findAll() {

        List<Product> productList = this.repository.findAll();

        assertThat(productList).hasSize(2);
        assertThat(productList).extracting(Product::getName).containsExactly("Brahma Extra Red Lager", "Patagonia Amber Lager");
    }

    @Test
    public void save() {

        Container container = new Container();
        container.setId(UUID.fromString("f5014a75-c3db-40b8-a49b-2076e1b19801"));

        ProductContainer productContainer = new ProductContainer();
        productContainer.setContainer(container);

        ProductType producttype = new ProductType();
        producttype.setId(UUID.fromString("d6a0ed3a-82b7-4c10-9190-27a737faf454"));

        Product product = new Product();
        product.setName("FooBar");
        product.setCode(3L);
        product.setName("Patagonia Bohemian Pilsener");
        product.setDescription("Tradicional cerveja do tipo Pilsen. Ela é produzida com o lúpulo tcheco Saaz que proporciona um aroma fresco e frutado bem característico, além de uma coloração dourada profunda.");
        product.setHarmonization("Lula frita e peixes de sabor forte.");
        product.setActive(true);
        product.setType(producttype);
        product.getContainers().add(productContainer);

        productContainer.setProduct(product);

        Product savedProduct = this.repository.saveAndFlush(product);

        assertThat(savedProduct.getId()).isNotNull();
        assertThat(savedProduct.getCode()).isEqualTo(product.getCode());
        assertThat(savedProduct.getName()).isEqualTo(product.getName());
        assertThat(savedProduct.getDescription()).isEqualTo(product.getDescription());
        assertThat(savedProduct.getHarmonization()).isEqualTo(product.getHarmonization());
        assertThat(savedProduct.getActive()).isEqualTo(product.getActive());
        assertThat(savedProduct.getType()).isEqualTo(product.getType());
        assertThat(savedProduct.getContainers()).extracting(ProductContainer::getId).containsExactlyInAnyOrder(productContainer.getId());

    }

    @Test
    public void update() {
// product container ->
        ProductType producttypeupdate = new ProductType();
        producttypeupdate.setId(UUID.fromString("bf4c8551-a6d5-43f1-a76c-78f537def578"));
        producttypeupdate.setCode(6L);
        producttypeupdate.setDescription("Bohemian Pilsner");

        Container container;

        Product productBeforeUpdate = this.repository.findById(PRODUCT_ID).get();

        ProductContainer productcontainer = new ProductContainer();
        productcontainer.setId(UUID.fromString("f5014a75-c3db-40b8-a49b-2076e1b19801"));
        productcontainer.setProduct(productBeforeUpdate);
        //productcontainer.setContainer();

        assertThat(productBeforeUpdate.getId()).isEqualTo(PRODUCT_ID);
        assertThat(productBeforeUpdate.getCode()).isEqualTo(1L);
        assertThat(productBeforeUpdate.getName()).isEqualTo("Brahma Extra Red Lager");
        assertThat(productBeforeUpdate.getDescription()).isEqualTo("Sabor marcante que combina com massas e queijos é com a Brahma Red Lager. A cerveja tem um leve aroma de caramelo, malte torrado e suaves notas de frutas e doces.");
        assertThat(productBeforeUpdate.getHarmonization()).isEqualTo("Massas a Bolonhesa e Queijo Parmesão.");
        assertThat(productBeforeUpdate.getActive()).isEqualTo(true);
        assertThat(productBeforeUpdate.getType().getId()).isEqualTo("d6a0ed3a-82b7-4c10-9190-27a737faf454");

        productBeforeUpdate.setCode(5L);
        productBeforeUpdate.setName("Colorado Eugênia");
        productBeforeUpdate.setDescription("Eugênia é uma cerveja do estilo Session IPA, com aromas marcantes dos lúpulos americanos, alemães e franceses, com um ingrediente especial: a fruta Uvaia, típica da Mata Atlântica, rica em vitamina C e A, super aromática e com sabor cítrico. A Cerveja Colorado Eugênia é leve, refrescante e amarga na medida (40 IBU). Desiberne, cerveja pode ter fruta!");
        productBeforeUpdate.setHarmonization("Ceviche, comida mexicana (tacos, quesadilla), chicken wings, petiscos, churrasco e sobremesas ácidas.");
        productBeforeUpdate.setActive(false);
        productBeforeUpdate.setType(producttypeupdate);
        //productBeforeUpdate.getContainers().add();
        productBeforeUpdate.getFlavors().add(new ProductFlavor());

        Product productAfterUpdate = this.repository.saveAndFlush(productBeforeUpdate);

        assertThat(productAfterUpdate.getId()).isEqualTo(PRODUCT_ID);
        assertThat(productAfterUpdate.getCode()).isEqualTo(5L);
        assertThat(productAfterUpdate.getName()).isEqualTo("Colorado Eugênia");
        assertThat(productAfterUpdate.getDescription()).isEqualTo("Eugênia é uma cerveja do estilo Session IPA, com aromas marcantes dos lúpulos americanos, alemães e franceses, com um ingrediente especial: a fruta Uvaia, típica da Mata Atlântica, rica em vitamina C e A, super aromática e com sabor cítrico. A Cerveja Colorado Eugênia é leve, refrescante e amarga na medida (40 IBU). Desiberne, cerveja pode ter fruta!");
        assertThat(productAfterUpdate.getHarmonization()).isEqualTo("Ceviche, comida mexicana (tacos, quesadilla), chicken wings, petiscos, churrasco e sobremesas ácidas.");
        assertThat(productAfterUpdate.getActive()).isEqualTo(false);
        assertThat(productAfterUpdate.getType().getId()).isEqualTo("bf4c8551-a6d5-43f1-a76c-78f537def578");
    }


}