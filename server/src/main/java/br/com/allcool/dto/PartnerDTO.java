package br.com.allcool.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class PartnerDTO {

	 private UUID id;
	 private String name;
	 private String phoneNumber;
	 private String address;
	 private String locality;
}
