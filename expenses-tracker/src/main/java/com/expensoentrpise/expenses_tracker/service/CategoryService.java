package com.expensoentrpise.expenses_tracker.service;

import com.expensoentrpise.expenses_tracker.dto.request.CategoryRequestDTO;
import com.expensoentrpise.expenses_tracker.dto.response.CategoryResponseDTO;
import com.expensoentrpise.expenses_tracker.model.Category;
import com.expensoentrpise.expenses_tracker.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    //************************************************//
    // CREATE CATEGORY
    //************************************************//
    @Transactional
    public CategoryResponseDTO createCategory(CategoryRequestDTO dto){

        //prevent duplicate categories
        categoryRepository.findByName(dto.getName())
                .ifPresent(cat->{
                    throw new RuntimeException("Category already exists");
                });

        Category category = Category.builder()
                .name(dto.getName())
                .createdBy(Category.CategorySource.USER)
                .build();

        Category saved = categoryRepository.save(category);

        return new CategoryResponseDTO(
                saved.getId(),
                saved.getName(),
                saved.getCreatedBy().name()
        );
    }

    //************************************************//
    // GET ALL CATEGORIES
    //************************************************/
    public List<CategoryResponseDTO> getAllCategories(){
        return categoryRepository.findAll()
                .stream()
                .map(cat->new CategoryResponseDTO(
                        cat.getId(),
                        cat.getName(),
                        cat.getCreatedBy().name()
                ))
                .toList();
    }

    //************************************************//
    // UPDATE CATEGORY
    //************************************************//
    @Transactional
    public CategoryResponseDTO updateCategory(Long id , CategoryRequestDTO dto){
        Category category = categoryRepository.findById(id)
                .orElseThrow(()->
                        new RuntimeException("Category not found with id:"+id)
                        );

        category.setName(dto.getName());

        Category updated = categoryRepository.save(category);

        return new CategoryResponseDTO(
                updated.getId(),
                updated.getName(),
                updated.getCreatedBy().name()
        );
    }
}
