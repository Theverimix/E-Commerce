package com.ecommerce.user;

import jakarta.validation.constraints.NotNull;

public record ResetPasswordRequest(
    @NotNull String email,
    @NotNull String newPassword,
    @NotNull String code
    // @NotNull String confirmPassword,
) {}
