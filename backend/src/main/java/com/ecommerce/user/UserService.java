package com.ecommerce.user;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final UserMapper mapper;

    public List<UserResponse> getAllUsers() {
        return repository.findAll().stream()
                .map(mapper)
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(@NonNull Long id) {
        return repository.findById(id)
                .map(mapper)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Customer with id [%s] not found.".formatted(id)));
    }

    public void updateUser(Long id, UserUpdateRequest request) {
        User user = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found."));
        user.setName(request.name());
        user.setPassword(request.password());
        user.setEmail(request.email());
        user.setState(request.state());

        repository.save(user);
    }

    public void deleteUser(@NonNull Long id) {
        User user = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found."));
        repository.delete(user);
    }

}