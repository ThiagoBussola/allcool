package br.com.allcool.converter;

import br.com.allcool.dto.FileDTO;
import br.com.allcool.dto.PartnerViewDTO;
import br.com.allcool.dto.WorkingPeriodDTO;
import br.com.allcool.partner.domain.Partner;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class PartnerViewDTOConverter {

    public PartnerViewDTO to(Partner partner) {

        PartnerViewDTO dto = new PartnerViewDTO();

        WorkingPeriodDTOConverter workingPeriodDTOConverter = new WorkingPeriodDTOConverter();

        if (partner == null) {
            return dto;
        }

        dto.setId(partner.getId());
        dto.setName(partner.getName());
        dto.setDescription(partner.getDescription());
        dto.setPhoneNumber(partner.getPhoneNumber());
        dto.setRating(partner.getRating());

        if (Objects.nonNull(partner.getFile())) {
            dto.setFileDTO(new FileDTO(partner.getFile().getId(), partner.getFile().getUrl()));
        }

        List<WorkingPeriodDTO> workingPeriodDTOS = partner.getWorkingPeriods().stream().map(workingPeriodDTOConverter::to).collect(Collectors.toList());

        dto.setWorkingPeriodDTOList(workingPeriodDTOS);

        return dto;
    }
}
