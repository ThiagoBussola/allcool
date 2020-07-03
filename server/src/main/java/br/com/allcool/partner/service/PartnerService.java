package br.com.allcool.partner.service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.allcool.converter.PartnerDTOConverter;
import br.com.allcool.dto.PartnerDTO;
import br.com.allcool.partner.repository.PartnerRepository;

@Service
@Transactional(readOnly = true)
public class PartnerService {

	private final PartnerRepository repository;
	
	public PartnerService(PartnerRepository repository) {
		this.repository = repository;
	}
	
    public List<PartnerDTO> findAll() {

    	PartnerDTOConverter converter = new PartnerDTOConverter();

        List<PartnerDTO> partnerDTOList = this.repository.findAll()
                .stream().map(converter::to).collect(Collectors.toList());

        return partnerDTOList.stream().sorted(Comparator.comparing(PartnerDTO::getName)).collect(Collectors.toList());
    }
    
}
