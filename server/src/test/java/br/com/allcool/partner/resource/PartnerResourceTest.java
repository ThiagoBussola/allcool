package br.com.allcool.partner.resource;

import static org.hamcrest.CoreMatchers.hasItems;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.UUID;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import br.com.allcool.dto.PartnerDTO;
import br.com.allcool.partner.service.PartnerService;
import br.com.allcool.test.ResourceTest;

@RunWith(SpringRunner.class)
@ResourceTest(PartnerResource.class)
public class PartnerResourceTest {

	@Autowired
    private MockMvc mockMvc;
	
	@MockBean
    private PartnerService service;
	
	@Test
	public void findAll() throws Exception {

		 	PartnerDTO partner = new PartnerDTO();
	    	partner.setId(UUID.randomUUID());
	    	partner.setName("MPB Bar");
	    	partner.setDescription("Bar de Emo");
	        partner.setPhoneNumber("992448023");
	        
	        PartnerDTO partner2 = new PartnerDTO();
	        partner2.setId(UUID.randomUUID());
	        partner2.setName("Atari Bar");
	    	partner2.setDescription("Bar de Emo 2");
	    	partner2.setPhoneNumber("99446556");

	        when(this.service.findAll()).thenReturn(Arrays.asList(partner, partner2));

	        this.mockMvc.perform(get("/api/partners"))
	                .andDo(MockMvcResultHandlers.print())
	                .andExpect(status().isOk())
	                .andExpect(jsonPath("$.[*].id", hasItems(partner.getId().toString(),
	                		partner2.getId().toString())))
	                .andExpect(jsonPath("$.[*].name", hasItems(partner.getName(),
	                		partner2.getName())))
	                .andExpect(jsonPath("$.[*].description", hasItems(partner.getDescription(),
	                		partner2.getDescription())))
	                .andExpect(jsonPath("$.[*].phoneNumber", hasItems(partner.getPhoneNumber(),
	                		partner2.getPhoneNumber())));

	        verify(this.service).findAll();
	        verifyNoMoreInteractions(this.service);
	    }
}
