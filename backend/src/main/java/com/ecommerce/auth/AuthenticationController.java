package com.ecommerce.auth;

import com.ecommerce.exception.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ApiResponse registration(
            @Valid @RequestBody RegisterRequest request
    ) {
        AuthenticationResponse response = service.register(request);
        return ApiResponse.ok(response);
    }

    @PostMapping("/login")
    public ApiResponse login(
            @Valid @RequestBody LoginRequest request
    ) {
        AuthenticationResponse response = service.login(request);
        return ApiResponse.ok(response);
    }
}
