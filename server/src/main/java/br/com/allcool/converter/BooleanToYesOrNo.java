package br.com.allcool.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class BooleanToYesOrNo implements AttributeConverter<Boolean, String> {

    private static final String YES = "Y";
    private static final String NO = "N";

    @Override
    public String convertToDatabaseColumn(Boolean attribute) {

        if (Boolean.TRUE.equals(attribute)) {
            return YES;
        }

        return NO;

    }

    @Override
    public Boolean convertToEntityAttribute(String dbData) {

        if (dbData == null) {
            return null;
        }

        return YES.equalsIgnoreCase(dbData);
    }

}
