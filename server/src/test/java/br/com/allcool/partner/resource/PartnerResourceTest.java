package br.com.allcool.partner.resource;

import br.com.allcool.dto.FileDTO;
import br.com.allcool.dto.PartnerDTO;
import br.com.allcool.dto.PartnerViewDTO;
import br.com.allcool.dto.WorkingPeriodDTO;
import br.com.allcool.partner.service.PartnerService;
import br.com.allcool.test.ResourceTest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.hasItems;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@ResourceTest(PartnerResource.class)
public class PartnerResourceTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PartnerService service;

    @Test
    public void findById() throws Exception {

        FileDTO fileDTO = new FileDTO();
        fileDTO.setId(UUID.randomUUID());
        fileDTO.setUrl("www.fileDTO.com");

        WorkingPeriodDTO workingPeriodDTO = new WorkingPeriodDTO();
        workingPeriodDTO.setId(UUID.randomUUID());
        workingPeriodDTO.setOpeningTime(LocalTime.of(16, 30));
        workingPeriodDTO.setDay("Sexta");
        workingPeriodDTO.setClosingTime(LocalTime.MIN);

        List<WorkingPeriodDTO> workingPeriodDTOList = new ArrayList<>();
        workingPeriodDTOList.add(workingPeriodDTO);

        PartnerViewDTO partner = new PartnerViewDTO();
        partner.setId(UUID.randomUUID());
        partner.setName("Bar do Azeitona");
        partner.setDescription("Famoso bar da cidade conhecido por muitos estudantes.");
        partner.setPhoneNumber("999999999");
        partner.setRating(BigDecimal.valueOf(3.5));
        partner.setFileDTO(fileDTO);
        partner.setWorkingPeriodDTOList(workingPeriodDTOList);
        partner.setLocality("Maringa - PR");
        partner.setAddress("Rua teste, 111 - teste");

        when(this.service.findById(partner.getId())).thenReturn(partner);

        this.mockMvc.perform(get("/api/partners/{id}", partner.getId()))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", equalTo(partner.getId().toString())))
                .andExpect(jsonPath("$.name", equalTo(partner.getName())))
                .andExpect(jsonPath("$.description", equalTo(partner.getDescription())))
                .andExpect(jsonPath("$.phoneNumber", equalTo(partner.getPhoneNumber())))
                .andExpect(jsonPath("$.rating", equalTo(3.5)))
                .andExpect(jsonPath("$.fileDTO.id", equalTo(partner.getFileDTO().getId().toString())))
                .andExpect(jsonPath("$.workingPeriodDTOList.[*].id", hasItems(workingPeriodDTO.getId().toString())))
                .andExpect(jsonPath("$.address", equalTo(partner.getAddress())))
                .andExpect(jsonPath("$.locality", equalTo(partner.getLocality())));

    }

    @Test
    public void findAll() throws Exception {

        PartnerDTO partner = new PartnerDTO();
        partner.setId(UUID.randomUUID());
        partner.setName("MPB Bar");
        partner.setLocality("Maringa - PR");
        partner.setAddress("Rua teste, 111 - teste");
        partner.setPhoneNumber("992448023");

        PartnerDTO partner2 = new PartnerDTO();
        partner2.setId(UUID.randomUUID());
        partner2.setName("Atari Bar");
        partner2.setLocality("Sarandi - PR");
        partner2.setAddress("Rua teste, 222 - teste");
        partner2.setPhoneNumber("99446556");

        when(this.service.findAll()).thenReturn(Arrays.asList(partner, partner2));

        this.mockMvc.perform(get("/api/partners"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[*].id", hasItems(partner.getId().toString(),
                        partner2.getId().toString())))
                .andExpect(jsonPath("$.[*].name", hasItems(partner.getName(),
                        partner2.getName())))
                .andExpect(jsonPath("$.[*].locality", hasItems(partner.getLocality(),
                        partner2.getLocality())))
                .andExpect(jsonPath("$.[*].address", hasItems(partner.getAddress(),
                        partner2.getAddress())))
                .andExpect(jsonPath("$.[*].phoneNumber", hasItems(partner.getPhoneNumber(),
                        partner2.getPhoneNumber())));

        verify(this.service).findAll();
        verifyNoMoreInteractions(this.service);
    }
}