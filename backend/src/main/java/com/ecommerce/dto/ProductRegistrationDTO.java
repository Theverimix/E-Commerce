package com.ecommerce.dto;

import com.ecommerce.entities.Category;

import java.util.List;
import java.util.Set;

import javax.validation.constraints.Min;

import org.hibernate.validator.constraints.NotBlank;

public record ProductRegistrationDTO(
        @NotBlank @Min(3) String name,
        @NotBlank @Min(3) String description,
        @NotBlank double price,
        @NotBlank int stock,
        @NotBlank Long idState,
        @NotBlank boolean visible,
        List<String> images,
        Set<Category> productCategories) {
}
