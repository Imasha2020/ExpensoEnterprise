package com.expensoentrpise.expenses_tracker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

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
    @Column(nullable = false , unique = true)
    private String username;

    //Used for login
    @Column(nullable = false , unique=true)
    private String email;

    //Hashed password (BCrypt)
    @Column(nullable = false)
    private String passwordHash;

    //USER or ADMIN
    @Enumerated(EnumType.STRING)
    private Role role;

    //soft delete / disable
    private boolean isActive = true;

    @CreationTimestamp
    private LocalDateTime createAt;

    @CreationTimestamp
    private LocalDateTime updatedAt;

    public enum Role {
        USER,
        ADMIN
    }
}
