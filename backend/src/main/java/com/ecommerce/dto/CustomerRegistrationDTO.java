package com.ecommerce.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

public record CustomerRegistrationDTO(
        @NotBlank @Min(3) String name,
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$") String password,
        @Email String email,
        @NotBlank @Min(3) String address,
        @NotBlank @Min(9) String phone,
        @NotBlank @Min(3) String country) {
}
