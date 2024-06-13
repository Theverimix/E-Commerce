package com.ecommerce.customer;

import com.ecommerce.address.Address;
import com.ecommerce.user.UserRole;
import com.ecommerce.user.UserState;

import java.util.Date;
import java.util.List;

public record CustomerResponse(
                Long id,
                String firstname,
                String lastname,
                String email,
                UserState state,
                UserRole role,
                List<Address> addresses,
                Date registerDate,
                String country,
                String phone) {
}
