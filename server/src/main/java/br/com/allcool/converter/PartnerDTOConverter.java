package br.com.allcool.converter;

import br.com.allcool.dto.PartnerDTO;
import br.com.allcool.partner.domain.Partner;

public class PartnerDTOConverter {

	public PartnerDTO to(Partner partner) {
        
		PartnerDTO dto = new PartnerDTO();

        if (partner == null) {
            return dto;
        }

        dto.setId(partner.getId());
        dto.setName(partner.getName());
        dto.setPhoneNumber(partner.getPhoneNumber());
        dto.setDescription(partner.getDescription());

        return dto;
    }
}
