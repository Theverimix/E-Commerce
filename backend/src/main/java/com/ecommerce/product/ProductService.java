package com.ecommerce.product;

import com.ecommerce.product.state.ProductStateRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductStateRepository productStateRepository;
    private final ProductMapper productMapper;

    public ProductResponse getProductById(Long id) {
        return productRepository.findById(id)
                .map(productMapper)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Product with id [%s] not found.".formatted(id)));
    }

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll().stream()
                .map(productMapper)
                .collect(Collectors.toList());
    }

    public void saveProduct(ProductRegisterRequest dto) {
        Product product = new Product();
        product.setName(dto.name());
        product.setDescription(dto.description());
        product.setPrice(dto.price());
        product.setStock(dto.stock());
        product.setVisible(dto.visible());
        product.setCreatedAt(new Date());
        product.setImages(dto.images());
        product.setProductCategories(dto.productCategories());
        product.setState(productStateRepository.findById(dto.idState()).orElse(null));
        productRepository.save(product);
    }

    public void updateProduct(Long id, ProductUpdateRequest req) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Product with id [%s] not found.".formatted(id)));

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
