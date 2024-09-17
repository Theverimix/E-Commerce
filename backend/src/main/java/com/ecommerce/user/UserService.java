package com.ecommerce.user;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecommerce.utils.CodeGenerator;
import com.ecommerce.utils.EmailService;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final UserMapper mapper;
    private final AuthenticationManager manager;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

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

        user.setPassword(passwordEncoder.encode(request.newPassword()));
        repository.save(user);
    }

    public void sendCode(String email) {
        Optional<User> userOptional = repository.findByEmail(email);
        System.out.println("user: " + userOptional);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String recoveryCode = CodeGenerator.generateNumericCode();
            user.setRecoveryCode(recoveryCode);
            user.setCodeGeneratedTime(Instant.now().toEpochMilli());
            repository.save(user);
            System.out.println("recoveryCode: " + recoveryCode);
            try {
                emailService.sendSimpleMessage(email, "Recuperación de Contraseña", "Tu código de recuperación es: " + recoveryCode);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public Long validateCode(CodeValidationRequest request) {
        User user = repository.findByEmail(request.email()).orElseThrow(() -> new EntityNotFoundException("User not found."));
        if (!user.getRecoveryCode().equals(request.recoveryCode())) {
            throw new IllegalArgumentException("Invalid recovery code.");
        }
        return user.getId();
    }


    public boolean resetPassword(String email, String recoveryCode, String newPassword) {
        Optional<User> userOptional = repository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Verifica si el código es válido (dentro de los últimos 10 minutos)
            long codeAge = Instant.now().toEpochMilli() - user.getCodeGeneratedTime();
            long tenMinutesInMillis = Duration.ofMinutes(10).toMillis();
            if (user.getRecoveryCode().equals(recoveryCode) && codeAge <= tenMinutesInMillis) {
                user.setPassword(passwordEncoder.encode(newPassword));
                user.setRecoveryCode(null);
                repository.save(user);
                return true;
            }
        }
        return false;
    }

}