package com.ecommerce.services;

import com.ecommerce.dto.UserDTO;
import com.ecommerce.dto.UserDTOMapper;
import com.ecommerce.entities.User;
import com.ecommerce.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserDTOMapper dtoMapper;

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(dtoMapper)
                .collect(Collectors.toList());
    }

    public UserDTO getUserById(@NonNull Long id) {
        return userRepository.findById(id)
                .map(dtoMapper)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Customer with id [%s] not found.".formatted(id)));
    }

    public void saveUser(UserDTO dto) {
        userRepository.save(mapDTOToUser(dto));
    }

    public void updateUser(UserDTO dto) {
        userRepository.save(mapDTOToUser(dto));
    }

    public void deleteUser(@NonNull Long id) {
        userRepository.deleteById(id);
    }

    private User mapDTOToUser(UserDTO dto) {
        User user = new User();

        user.setId(dto.id());
        user.setName(dto.name());
        user.setPassword(dto.password());
        user.setEmail(dto.email());
        user.setState(dto.state());
        user.setRole(dto.role());

        return user;
    }

}
