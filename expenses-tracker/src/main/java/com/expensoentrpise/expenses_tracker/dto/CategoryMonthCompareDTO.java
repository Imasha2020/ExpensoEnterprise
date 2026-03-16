package com.expensoentrpise.expenses_tracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class CategoryMonthCompareDTO {
    private String category;
    private BigDecimal currentMonth;
    private BigDecimal selectedMonth;
}
