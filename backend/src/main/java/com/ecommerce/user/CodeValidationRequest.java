package com.ecommerce.user;

import jakarta.validation.constraints.NotNull;

public record CodeValidationRequest(
    @NotNull String email,
    @NotNull String recoveryCode
) {}
