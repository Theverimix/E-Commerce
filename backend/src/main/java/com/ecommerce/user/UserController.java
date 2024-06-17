package com.ecommerce.user;

import com.ecommerce.exception.ApiResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import java.util.List;

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
}
