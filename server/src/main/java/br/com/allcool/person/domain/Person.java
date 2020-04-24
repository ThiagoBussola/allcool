package br.com.allcool.person.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.UUID;

@Data
@Entity
@Table(name = "person")
@EqualsAndHashCode(of = "id")
public class Person {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private UUID id;

    @NotBlank
    @Length(max = 150)
    @Column(name = "username")
    private String userName;

    @NotBlank
    @Length(max = 60)
    private String email;

    @NotNull
    @Column(name = "birthdate")
    private LocalDate birthDate;
}
