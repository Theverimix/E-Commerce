package com.ecommerce.dto;

import com.ecommerce.enums.UsersRoles;
import com.ecommerce.enums.UsersStates;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;

    private String name;

    private String password;

    private String email;

    private UsersStates state;

    private UsersRoles role;
}
