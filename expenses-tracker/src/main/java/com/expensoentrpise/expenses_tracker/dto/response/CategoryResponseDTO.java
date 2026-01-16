package com.expensoentrpise.expenses_tracker.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponseDTO {
    private Long id;
    private String name;
    private String createdBy; // SYSTEM / USER
}
