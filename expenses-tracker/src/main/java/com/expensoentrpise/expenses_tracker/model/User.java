package com.expensoentrpise.expenses_tracker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "users",
        indexes = {
                @Index(name = "idx_user_email", columnList = "email"),
                @Index(name = "idx_user_role", columnList = "role"),
                @Index(name = "idx_user_active", columnList = "is_active")
        },
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "email"),
                @UniqueConstraint(columnNames = "username")
        }
)

@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    // // Display name
    @Column(nullable = false, unique = true, length = 50)
    private String username;


    //Used for login
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    //Hashed password (BCrypt)
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    //USER or ADMIN
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Role role;

    //soft delete / disable
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public enum Role {
        USER,
        ADMIN
    }
}
