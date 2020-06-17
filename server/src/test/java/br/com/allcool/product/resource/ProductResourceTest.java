package br.com.allcool.product.resource;

import br.com.allcool.product.domain.Product;
import br.com.allcool.product.domain.ProductFlavor;
import br.com.allcool.product.service.ProductService;
import br.com.allcool.test.ResourceTest;
import org.hamcrest.CoreMatchers;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.util.UUID;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@ResourceTest(ProductResource.class)
public class ProductResourceTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService service;

    @Test
    public void findById() throws Exception {

        ProductFlavor flavor1 = new ProductFlavor();
        flavor1.setId(UUID.randomUUID());

        ProductFlavor flavor2 = new ProductFlavor();
        flavor2.setId(UUID.randomUUID());

        ProductFlavor flavor3 = new ProductFlavor();
        flavor3.setId(UUID.randomUUID());

        Product product = new Product();
        product.setId(UUID.randomUUID());
        product.setName("Product Name Test");
        product.setDescription("Product Description Test");
        product.setCode(1L);
        product.setActive(Boolean.TRUE);
        product.getFlavors().add(flavor1);
        product.getFlavors().add(flavor2);
        product.getFlavors().add(flavor3);

        when(this.service.findById(product.getId())).thenReturn(product);

        this.mockMvc.perform(get("/api/products/{id}", product.getId()))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", equalTo(product.getId().toString())))
                .andExpect(jsonPath("$.name", equalTo(product.getName())))
                .andExpect(jsonPath("$.description", equalTo(product.getDescription())))
                .andExpect(jsonPath("$.code", equalTo(product.getCode().intValue())))
                .andExpect(jsonPath("$.active", equalTo(product.getActive())))
                .andExpect(jsonPath("$.flavors[*].id",
                        CoreMatchers.hasItems(flavor1.getId().toString(), flavor2.getId().toString(), flavor3.getId().toString())));

        verify(this.service).findById(product.getId());
        verifyNoMoreInteractions(this.service);
    }
}
