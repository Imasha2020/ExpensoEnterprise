package com.expensoentrpise.expenses_tracker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(
        name = "categories" ,
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "name")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "created_by", length = 10)
    private CategorySource createdBy;

    public enum CategorySource{
        SYSTEM ,
        USER
    }
}
