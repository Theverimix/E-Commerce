package com.ecommerce.services;

import com.ecommerce.dto.ProductDTO;
import com.ecommerce.dto.ProductDTOMapper;
import com.ecommerce.dto.ProductRegistrationDTO;
import com.ecommerce.entities.Product;
import com.ecommerce.repositories.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductDTOMapper productDtoMapper;
    private final ProductStateService productStateService;

    public ProductService(ProductRepository productRepository, ProductDTOMapper productDtoMapper, ProductStateService productStateService) {
        this.productRepository = productRepository;
        this.productDtoMapper = productDtoMapper;
        this.productStateService = productStateService;
    }

    public ProductDTO getProductById(Long id) {
        return productRepository.findById(id)
                .map(productDtoMapper)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Product with id [%s] not found.".formatted(id)
                ));
    }

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(productDtoMapper)
                .collect(Collectors.toList());
    }

    public void addProduct(ProductRegistrationDTO dto){
        Product product = new Product();
        product.setName(dto.name());
        product.setDescription(dto.description());
        product.setPrice(dto.price());
        product.setStock(dto.stock());
        product.setVisible(dto.visible());
        product.setCreatedAt(new Date());
        product.setImages(dto.images());
        product.setProductCategories(dto.productCategories());
        product.setState(productStateService.getStateById(dto.idState()));
        log.warn("product:" + product);
        productRepository.save(product);
    }

    public void saveProduct(ProductDTO dto) {
        Product product = new Product(
                dto.id(),
                dto.name(),
                dto.description(),
                dto.price(),
                dto.stock(),
                dto.createdDate(),
                dto.state(),
                dto.visible(),
                dto.images(),
                dto.productCategories(),
                dto.productSales()
        );
        log.warn("product:" + product);
        productRepository.save(product);
    }

    public void updateProduct(Long id, ProductDTO dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Product with id [%s] not found.".formatted(id)));

        product.setName(dto.name());
        product.setDescription(dto.description());
        product.setPrice(dto.price());
        product.setStock(dto.stock());
        product.setVisible(dto.visible());
        productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product with id [%s] not found.".formatted(id)));
        productRepository.delete(product);
    }
}
