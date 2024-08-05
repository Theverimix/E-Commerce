package com.ecommerce.customer;

import com.ecommerce.user.UserState;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CustomerUpdateRequest(
                @NotBlank @Size(min = 3) String firstname,
                @NotBlank @Size(min = 3) String lastname,
                @Email String email,
                String country,
                String phone,
                UserState state
                ) {
}
