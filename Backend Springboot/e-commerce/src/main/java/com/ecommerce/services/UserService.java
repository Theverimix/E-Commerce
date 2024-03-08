package com.ecommerce.services;

import com.ecommerce.dto.UserDTO;
import com.ecommerce.entities.User;
import com.ecommerce.repositories.UserRepository;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(@NonNull Long id) {
        return userRepository.findById(id);
    }

    public User saveUser(UserDTO dto) {
        return userRepository.save(mapDTOToUser(dto));
    }

    public User updateUser(UserDTO dto) {
        return userRepository.save(mapDTOToUser(dto));
    }

    public void deleteUser(@NonNull Long id) {
        userRepository.deleteById(id);
    }

    // public UserDTO mapUserToDTO(User user) {
    // UserDTO dto = new UserDTO();

    // dto.setId(user.getId());
    // dto.setName(user.getName());
    // dto.setPassword(user.getPassword());
    // dto.setEmail(user.getEmail());
    // dto.setState(user.getState());
    // dto.setRole(user.getRole());

    // return dto;
    // }

    public User mapDTOToUser(UserDTO dto) {
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
