package com.ecommerce.customer;

import com.ecommerce.enums.UserRole;
import com.ecommerce.enums.UserState;

import java.util.Date;

public record CustomerResponse(
                Long id,
                String firstname,
                String lastname,
                String email,
                UserState state,
                UserRole role,
                String address,
                Date registerDate,
                String country,
                String phone
) {
}
