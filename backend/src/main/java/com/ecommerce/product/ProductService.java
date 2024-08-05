package com.ecommerce.product;

import com.ecommerce.product.category.CategoryRepository;
import com.ecommerce.product.state.ProductState;
import com.ecommerce.product.state.ProductStateRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.ecommerce.product.ProductRepository.*;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductMapper mapper;
    private final ProductRepository productRepository;
    private final ProductStateRepository productStateRepository;
    private final CategoryRepository categoryRepository;

    public ProductResponse getProductById(Long productId) {
        return productRepository.findByIdAndVisibleTrue(productId)
                .map(mapper)
                .orElseThrow(() -> new EntityNotFoundException("Product with id [%s] not found.".formatted(productId)));
    }

    public List<ProductResponse> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategory(categoryId).stream()
                .map(mapper)
                .collect(Collectors.toList());
    }

    public ProductPageResponse getAllProducts(int page) {
        PageRequest pageRequest = PageRequest.of(page, 9, Sort.by("id"));

        Page<Product> pageProducts = productRepository.findAllByVisibleTrue(pageRequest);

        int totalPages = pageProducts.getTotalPages();
        long totalElements = pageProducts.getTotalElements();

        List<ProductResponse> productListMap = pageProducts.map(mapper).getContent();

        return new ProductPageResponse(productListMap, totalPages, totalElements);
    }

    public void saveProduct(ProductRegisterRequest dto) {
        ProductState state = productStateRepository.findById(dto.state()).orElseThrow(
                () -> new EntityNotFoundException("State with id [%s] not found.".formatted(dto.state())));

        Product product = new Product();
        product.setName(dto.name());
        product.setDescription(dto.description());
        product.setPrice(dto.price());
        product.setStock(dto.stock());
        product.setVisible(dto.visible());
        product.setCreatedAt(new Date());
        product.setImages(dto.images());
        product.setCategories(categoryRepository.findAllById(dto.categories()));
        product.setState(state);
        productRepository.save(product);
    }

    public void updateProduct(Long id, ProductUpdateRequest req) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product with id [%s] not found.".formatted(id)));

        product.setName(req.name());
        product.setDescription(req.description());
        product.setPrice(req.price());
        product.setStock(req.stock());
        product.setVisible(req.visible());
        productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product with id [%s] not found.".formatted(id)));
        productRepository.delete(product);
    }

    public ProductPageResponse searchProduct(
            int page, String name, Double minPrice, Double maxPrice, String categoryName, boolean booleanSale
    ) {

        // SPECIFICATION CREATION

        List<Specification<Product>> specs = new ArrayList<>();

        specs.add(hasVisibleTrue());

        boolean validMinPrice = minPrice != null && minPrice >= 0;
        boolean validMaxPrice = maxPrice != null && maxPrice > 0;

        if (name != null && !name.isEmpty())
            specs.add(nameContainingIgnoreCase(name));

        if (validMinPrice && validMaxPrice) {
            specs.add(hasPriceBetween(minPrice, maxPrice));
        } else if (validMinPrice) {
            specs.add(hasPriceGreaterThanEqual(minPrice));
        } else if (validMaxPrice) {
            specs.add(hasPriceLessThanEqual(maxPrice));
        }

        if (categoryName != null && !categoryName.isEmpty())
            categoryRepository.findByNameIgnoreCase(categoryName.toLowerCase())
                    .ifPresent(category -> specs.add(hasCategory(category)));
        if (booleanSale)
            specs.add(hasSale());

        Specification<Product> finalSpecifications = specs.stream().reduce(Specification::and).orElse(null);

        // PAGE CREATION

        PageRequest pageRequest = PageRequest.of(page, 9, Sort.by("id"));

        Page<Product> pageProducts = productRepository.findAll(finalSpecifications, pageRequest);

        int totalPages = pageProducts.getTotalPages();
        long totalElements = pageProducts.getTotalElements();

        List<ProductResponse> productListMap = pageProducts.map(mapper).getContent();

        return new ProductPageResponse(productListMap, totalPages, totalElements);
    }

    public List<ProductResponse> getProductsByIds(List<Long> ids) {
        return productRepository.findAllById(ids).stream()
                .map(mapper)
                .collect(Collectors.toList());
    }

}
