package com.expensoentrpise.expenses_tracker.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class TransactionRequestDTO {

    private String title;
    private BigDecimal amount;
    private String type; // INCOME / EXPENSE
    private Long categoryId;
    private String description;
    private LocalDate transactionDate;

}
