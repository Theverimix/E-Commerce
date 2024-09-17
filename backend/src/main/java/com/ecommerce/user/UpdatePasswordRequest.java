package com.ecommerce.user;

import jakarta.validation.constraints.NotNull;

public record UpdatePasswordRequest(
    @NotNull String currentPassword,
    @NotNull String newPassword
    //TODO: pasar la confirmacion de la contraseña
){}
