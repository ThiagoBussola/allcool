package br.com.allcool.partner.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import br.com.allcool.address.domain.Address;
import br.com.allcool.dto.PartnerDTO;
import br.com.allcool.partner.domain.Partner;
import br.com.allcool.partner.repository.PartnerRepository;

@RunWith(MockitoJUnitRunner.class)
public class PartnerServiceTest {

	@InjectMocks
    private PartnerService service;

    @Mock
    private PartnerRepository repository;

    @Test
    public void findAll() {
        
    	Address address = new Address();
    	address.setId(UUID.randomUUID());
    	address.setLocality("Maringa");
    	address.setDistrict("Zona 7");
    	address.setFederatedUnit("PR");
    	address.setPublicPlace("Av. Paranagua, 138");
    	
        Partner partner = new Partner();
        partner.setId(UUID.randomUUID());
        partner.setName("Teste parceiro");
        partner.setAddress(address);
        partner.setPhoneNumber("992448023");
        partner.setRating(BigDecimal.valueOf(4.5));

        when(this.repository.findAll()).thenReturn(Collections.singletonList(partner));

        List<PartnerDTO> result = this.service.findAll();

        assertThat(result).extracting(PartnerDTO::getId).containsExactly(partner.getId());
        assertThat(result).extracting(PartnerDTO::getPhoneNumber).containsExactly(partner.getPhoneNumber());
        assertThat(result).extracting(PartnerDTO::getName).containsExactly(partner.getName());
        assertThat(result).extracting(PartnerDTO::getLocality).containsExactly("Maringa - PR");
        assertThat(result).extracting(PartnerDTO::getAddress).containsExactly("Av. Paranagua, 138 - Zona 7");

        verify(this.repository).findAll();
        verifyNoMoreInteractions(this.repository);
    }
}
