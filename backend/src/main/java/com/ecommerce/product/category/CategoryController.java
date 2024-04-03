package com.ecommerce.product.category;

import com.ecommerce.exception.ApiResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ApiResponse getAllCategories() {
        List<CategoryResponse> categories = categoryService.getAllCategories();
        return ApiResponse.ok(categories);
    }

    @GetMapping("/{categoryId}")
    public ApiResponse getCategoryById(@PathVariable Long categoryId) {
        CategoryResponse category = categoryService.getCategoryById(categoryId);
        return ApiResponse.ok(category);
    }

    @PostMapping
    public ApiResponse saveCategory(@RequestBody @Valid CategoryRequest request) {
        categoryService.saveCategory(request);
        return ApiResponse.created();
    }

    @PutMapping("/{categoryId}")
    public ApiResponse updateCategory(
            @PathVariable Long categoryId,
            @RequestBody @Valid CategoryRequest request) {
        categoryService.updateCategory(categoryId, request);
        return ApiResponse.updated();
    }

    @DeleteMapping("/{categoryId}")
    public ApiResponse updateCategory(@PathVariable Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return ApiResponse.deleted(categoryId);
    }
}
