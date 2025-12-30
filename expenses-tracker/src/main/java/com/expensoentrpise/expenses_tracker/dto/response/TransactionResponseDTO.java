package com.expensoentrpise.expenses_tracker.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionResponseDTO {
    private Long id;
    private String title;
    private BigDecimal amount;
    private String type; // INCOME / EXPENSE

    private Long categoryId;
    private String categoryName;

    private String description;
    private LocalDate transactionDate;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    public TransactionResponseDTO(Long id, String title, BigDecimal amount, String name, String description, LocalDate transactionDate, LocalDateTime createAt) {
    }
}
