package com.ecommerce.user;

import com.ecommerce.exception.ApiResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Secured("ADMINISTRATOR")
    @GetMapping
    public ApiResponse getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        return ApiResponse.ok(users);
    }

    @GetMapping("/{userId}")
    public ApiResponse getUserById(@PathVariable Long userId) {
        UserResponse user = userService.getUserById(userId);
        return ApiResponse.ok(user);
    }

    @Secured({ "ADMINISTRATOR", "CUSTOMER" })
    @PutMapping("/{userId}")
    public ApiResponse updateUser(
            @PathVariable Long userId,
            @Valid @RequestBody UserUpdateRequest request) {
        userService.updateUser(userId, request);
        return ApiResponse.updated();
    }

    @Secured("ADMINISTRATOR")
    @DeleteMapping("/{userId}")
    public ApiResponse deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ApiResponse.deleted();
    }

    @PutMapping("/password/{userId}")
    public ApiResponse updatePassword(@PathVariable Long userId, @RequestBody @Valid UpdatePasswordRequest request) {
        userService.updatePassword(userId, request);
        return ApiResponse.updated();
    }

    @PostMapping("/forgot")
    public ApiResponse forgotPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        try {
            // Decodificar manualmente si es necesario
            email = URLDecoder.decode(email, StandardCharsets.UTF_8.name());
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("email: " + email);
        userService.sendCode(email);
        return ApiResponse.ok("Code sent to your email.");
    }

    @PostMapping("/validate")
    public ApiResponse validateCode(@RequestBody CodeValidationRequest request) {
        Long data = userService.validateCode(request);
        return ApiResponse.ok("Code validated.", data);
    }

    @PostMapping("/reset")
    public ApiResponse resetPassword(@RequestBody ResetPasswordRequest request) {
        userService.resetPassword(request.email(), request.code(), request.newPassword());
        return ApiResponse.ok("Password reset successfully.");
    }
}
