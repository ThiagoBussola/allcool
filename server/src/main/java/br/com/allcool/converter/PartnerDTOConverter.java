package br.com.allcool.converter;

import br.com.allcool.address.domain.Address;
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
        dto.setAddress(buildStringAddress(partner.getAddress()));
        dto.setLocality(buildStringLocality(partner.getAddress()));

        return dto;
    }
	
	private String buildStringAddress (Address address) {
		
		return address.getPublicPlace() + " - " + address.getDistrict();
	}

	private String buildStringLocality (Address address) {
		
		return address.getLocality() + " - " + address.getFederatedUnit();
	}
}
