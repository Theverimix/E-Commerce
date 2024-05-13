package com.ecommerce.product;

import com.ecommerce.product.state.ProductState;
import com.ecommerce.product.state.ProductStateRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductMapper mapper;
    private final ProductRepository productRepository;
    private final ProductStateRepository productStateRepository;

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
        ProductState state = productStateRepository.findById(dto.idState()).orElseThrow(
                () -> new EntityNotFoundException("State with id [%s] not found.".formatted(dto.idState())));

        Product product = new Product();
        product.setName(dto.name());
        product.setDescription(dto.description());
        product.setPrice(dto.price());
        product.setStock(dto.stock());
        product.setVisible(dto.visible());
        product.setCreatedAt(new Date());
        product.setImages(dto.images());
        product.setCategories(dto.productCategories());
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

}
