package com.ecommerce.user;

import com.ecommerce.exception.ApiResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @PutMapping("/{userId}")
    public ApiResponse updateUser(
            @PathVariable Long userId,
            @Valid @RequestBody UserUpdateRequest request) {
        userService.updateUser(userId, request);
        return ApiResponse.updated();
    }

    @DeleteMapping("/{userId}")
    public ApiResponse deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ApiResponse.deleted();
    }

    @GetMapping("/userinfo")
    public String getUserInfo() {
        // Obtener el objeto Authentication del contexto de seguridad
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Verificar si el usuario está autenticado
        if (authentication != null && authentication.isAuthenticated()) {
            // Obtener el nombre de usuario
            String username = authentication.getName();

            // Obtener los roles/autoridades del usuario
            String roles = authentication.getAuthorities().toString();

            // Construir una respuesta con la información del usuario
            return "Usuario autenticado: " + username + ", Roles: " + roles;
        } else {
            return "No hay usuario autenticado";
        }
    }
}
