package com.ecommerce.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record CustomerRegistrationDTO(
                @NotBlank @Min(3) String name,
                @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$") String password,
                @Email String email,
                @NotBlank @Min(3) String address,
                @NotBlank @Min(9) String phone,
                @NotBlank @Min(3) String country) {
}
