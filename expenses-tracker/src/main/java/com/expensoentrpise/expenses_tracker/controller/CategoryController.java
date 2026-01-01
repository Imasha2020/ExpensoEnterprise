package com.expensoentrpise.expenses_tracker.controller;

import com.expensoentrpise.expenses_tracker.dto.request.CategoryRequestDTO;
import com.expensoentrpise.expenses_tracker.dto.response.CategoryResponseDTO;
import com.expensoentrpise.expenses_tracker.dto.response.TransactionResponseDTO;
import com.expensoentrpise.expenses_tracker.model.Category;
import com.expensoentrpise.expenses_tracker.repository.CategoryRepository;
import com.expensoentrpise.expenses_tracker.service.CategoryService;
import com.expensoentrpise.expenses_tracker.util.StandardResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Scanner;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@Slf4j
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;


    //************************************************//
    // CREATE CATEGORY (USER)
    //************************************************//
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StandardResponse> createCategory(@RequestBody CategoryRequestDTO dto){
        CategoryResponseDTO response = categoryService.createCategory(dto);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Created Transaction Successfully", response), HttpStatus.OK
        );

    }

    //************************************************//
    // UPDATE CATEGORY
    //************************************************//
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StandardResponse> updateCategory(
            @PathVariable Long id ,
            @RequestBody CategoryRequestDTO dto
    ){
        CategoryResponseDTO response = categoryService.updateCategory(id , dto);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Updated Transaction Successfully", response), HttpStatus.OK
        );
    }

    //************************************************//
    // GET ALL CATEGORIES
    //************************************************//
    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<StandardResponse> getAllCategories(){
        List<CategoryResponseDTO> categories = categoryService.getAllCategories();

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Get all Transactions Successfully", categories), HttpStatus.OK
        );
    }

}
