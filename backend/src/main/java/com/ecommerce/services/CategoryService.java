package com.ecommerce.services;

import com.ecommerce.dto.CategoryDTO;
import com.ecommerce.dto.CategoryDTOMapper;
import com.ecommerce.entities.Category;
import com.ecommerce.repositories.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryDTOMapper dtoMapper;

    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(dtoMapper)
                .collect(Collectors.toList());
    }

    public CategoryDTO getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .map(dtoMapper)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Category with id [%s] not found.".formatted(id)));
    }

    public void saveCategory(CategoryDTO dto) {
        categoryRepository.save(
                mapDtoToCategory(new Category(), dto));
    }

    public void updateCategory(Long id, CategoryDTO dto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Entity not found with id: " + id));
        categoryRepository.save(mapDtoToCategory(
                category, dto));
    }

    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Entity not found with id: " + id));
        categoryRepository.delete(category);
    }

    private Category mapDtoToCategory(Category category, CategoryDTO dto) {
        category.setId(dto.id());
        category.setName(dto.name());
        category.setDescription(dto.description());
        category.setVisible(dto.visible());
        return category;
    }
}
