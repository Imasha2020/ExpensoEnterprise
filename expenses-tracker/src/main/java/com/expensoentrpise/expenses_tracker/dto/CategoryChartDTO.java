package com.expensoentrpise.expenses_tracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

/**
 * Used for category-wise charts
 * Example:
 *  category = "Food"
 *  total = 8500
 */

@Data
@AllArgsConstructor
public class CategoryChartDTO {
    private String category;
    private BigDecimal total;
}
