package br.com.allcool.converter;

import java.util.Objects;

import br.com.allcool.dto.PartnerDTO;
import br.com.allcool.partner.domain.Partner;

public class PartnerDTOConverter {

	public PartnerDTO to(Partner partner) {
        
		PartnerDTO dto = new PartnerDTO();

        if (Objects.isNull(partner)) {
            return dto;
        }

        dto.setId(partner.getId());
        dto.setName(partner.getName());
        dto.setPhoneNumber(partner.getPhoneNumber());
        dto.setAddress(partner.getAddress());

        return dto;
    }

}
