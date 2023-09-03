package com.example.demo.products;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    //get all products
    @CrossOrigin(origins = "http://yakuptelli.com")
    @GetMapping("/products")
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    //create product
    @CrossOrigin(origins = "http://yakuptelli.com")
    @PostMapping("/products")
    public Product createProduct(@RequestBody Product product){
        return productRepository.save(product);
    }


    //get product by id
    @CrossOrigin(origins = "http://yakuptelli.com")
    @GetMapping("/products/{id}")
    public ResponseEntity<Product>  getProductById (@PathVariable Long id){

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not exist with id : " + id));

        return ResponseEntity.ok(product);

    }


    //update product
    @CrossOrigin(origins = "http://yakuptelli.com")
    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id,@RequestBody Product productDetails){

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not exist with id : " + id));

        product.setProductName(productDetails.getProductName());
        product.setProductDescription(productDetails.getProductDescription());
        product.setProductType(productDetails.getProductType());
        product.setProductPrice(productDetails.getProductPrice());
        product.setProductImagePath(productDetails.getProductImagePath());

        Product updatedProduct = productRepository.save(product);

        return ResponseEntity.ok(updatedProduct);

    }

    //delete product
    @CrossOrigin(origins = "http://yakuptelli.com")
    @DeleteMapping("/products/{id}")
    public ResponseEntity<Map<String, Boolean>>  deleteProduct(@PathVariable Long id){

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not exist with id : " + id));


        productRepository.delete(product);
        Map<String , Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);


    }







}