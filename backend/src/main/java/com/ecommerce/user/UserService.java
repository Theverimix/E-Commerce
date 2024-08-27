package com.ecommerce.user;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final UserMapper mapper;
    private final AuthenticationManager manager;

    public List<UserResponse> getAllUsers() {
        return repository.findAll().stream()
                .map(mapper)
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(@NonNull Long id) {
        return repository.findById(id)
                .map(mapper)
                .orElseThrow(() -> new EntityNotFoundException(
                        "User with id [%s] not found.".formatted(id)));
    }

    public void updateUser(Long id, UserUpdateRequest request) {
        User user = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found."));
        user.setFirstname(request.firstname());
        user.setLastname(request.lastname());
        user.setEmail(request.email());

        repository.save(user);
    }

    public void deleteUser(@NonNull Long id) {
        User user = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found."));
        repository.delete(user);
    }

    public void updatePassword(Long id, @NonNull UpdatePasswordRequest request) {
        User user = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found."));
        try {
            manager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getEmail(),
                            request.currentPassword()));
        } catch (BadCredentialsException ex) {
            throw new IllegalArgumentException("Current password is incorrect.");
        }

        user.setPassword(request.newPassword());
        repository.save(user);
    }

}