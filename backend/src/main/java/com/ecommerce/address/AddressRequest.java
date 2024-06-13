package com.ecommerce.address;

public record AddressRequest(
                Long customerId,
                String fullName,
                String addressLine,
                String city,
                String region,
                String country,
                String phone,
                String zip,
                String deliveryInstructions) {
}
