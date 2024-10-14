package com.ecommerce.address;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AddressMapper implements Function<Address, AddressResponse> {

    public AddressResponse apply(Address address) {
        return new AddressResponse(
                address.getId(),
                address.getFullName(),
                address.getAddressLine(),
                address.getCity(),
                address.getRegion(),
                address.getCountry(),
                address.getPhone(),
                address.getZip(),
                address.getDeliveryInstructions()
        );
    }
}
