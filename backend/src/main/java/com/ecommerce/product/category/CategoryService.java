package com.ecommerce.product.category;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper dtoMapper;

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(dtoMapper)
                .collect(Collectors.toList());
    }

    public CategoryResponse getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .map(dtoMapper)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Category with id [%s] not found.".formatted(id)));
    }

    public void saveCategory(CategoryRequest request) {
        Category category = new Category();
        category.setName(request.name());
        category.setDescription(request.description());
        category.setVisible(request.visible());
        categoryRepository.save(category);
    }

    public void updateCategory(Long categoryId, CategoryRequest request) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + categoryId));

        category.setName(request.name());
        category.setDescription(request.description());
        category.setVisible(request.visible());

        categoryRepository.save(category);
    }

    public void deleteCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + categoryId));
        categoryRepository.delete(category);
    }
}
