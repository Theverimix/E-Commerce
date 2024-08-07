package com.ecommerce.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserUpdateRequest(
        @NotBlank @Size(min = 3) String firstname,
        @NotBlank @Size(min = 3) String lastname,
        @Email String email) {
}
