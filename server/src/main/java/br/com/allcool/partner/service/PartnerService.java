package br.com.allcool.partner.service;

import br.com.allcool.converter.PartnerViewDTOConverter;
import br.com.allcool.dto.PartnerViewDTO;
import br.com.allcool.exception.DataNotFoundException;
import br.com.allcool.partner.repository.PartnerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class PartnerService {

    private final PartnerRepository repository;

    public PartnerService(PartnerRepository repository) {
        this.repository = repository;
    }

    public PartnerViewDTO findById(UUID id) {

        return new PartnerViewDTOConverter().to(this.repository.findById(id).orElseThrow(DataNotFoundException::new));
    }
}
