package com.ecommerce.customer;

import com.ecommerce.user.UserRole;
import com.ecommerce.user.UserState;

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
