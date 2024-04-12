package com.ecommerce.user;

import com.ecommerce.enums.UserState;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserUpdateRequest(
                @NotBlank @Size(min = 3) String firstname,
                @NotBlank @Size(min = 3) String lastname,
                @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!])(?=.*[a-zA-Z\\d@#$%^&+=!]).{8,}$") String password,
                @Email String email,
                @NotNull UserState state) {
}
