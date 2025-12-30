package com.expensoentrpise.expenses_tracker.repository;

import com.expensoentrpise.expenses_tracker.model.Category;
import com.expensoentrpise.expenses_tracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
