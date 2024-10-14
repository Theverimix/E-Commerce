package com.ecommerce.address;

public record AddressResponse(
        Long id,
        String fullName,
        String addressLine,
        String city,
        String region,
        String country,
        String phone,
        String zip,
        String deliveryInstructions
) {}
