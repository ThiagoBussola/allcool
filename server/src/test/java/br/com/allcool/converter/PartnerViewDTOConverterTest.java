package br.com.allcool.converter;

import br.com.allcool.dto.PartnerViewDTO;
import br.com.allcool.file.domain.File;
import br.com.allcool.partner.domain.Partner;
import org.junit.Test;

import java.math.BigDecimal;
import java.util.UUID;

public class PartnerViewDTOConverterTest {

    private final PartnerViewDTOConverter converter = new PartnerViewDTOConverter();

    @Test
    public void to() {

        File file = new File();
        file.setId(UUID.randomUUID());
        file.setUrl("www.teste.com");


        Partner partner = new Partner();
        partner.setId(UUID.randomUUID());
        partner.setName("Azeitona");
        partner.setDescription("Lugar com ambiente agradavel");
        partner.setPhoneNumber("992448023");
        partner.setRating(BigDecimal.valueOf(4.0));
        partner.setFile(file);


        PartnerViewDTO dto = new PartnerViewDTO();


//        private UUID id;
//        private String name;
//        private String description;
//        private String phoneNumber;
//        private BigDecimal rating;
//        private FileDTO fileDTO;
//        private List<WorkingPeriodDTO> workingPeriodDTOList;

    }
}
