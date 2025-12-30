package com.expensoentrpise.expenses_tracker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(
        name="transactions" ,
        indexes = {
                @Index(name = "idx_user_id" , columnList = "user_id") ,
                @Index(name = "idx_date" , columnList = "transaction_date"),
                @Index(name = "idx_type" , columnList = "type")
        }
)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Transaction {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    //Many transactions belong to one user
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id" , nullable = false)
    private User user;

    @Column(nullable = false , length = 100)
    private String title;

    //Money -> DECIMAL
    @Column(nullable = false , precision = 12 , scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false , length = 10)
    private TransactionType type;

    //One transaction belong to one category But One category have many transactions
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(columnDefinition = "TEXT")
    private String description;

    //Actual transaction date
    @Column(name = "transaction_date" , nullable = false)
    private LocalDate transactionDate;

    @CreationTimestamp
    private LocalDateTime createAt;

    @UpdateTimestamp
    private LocalDateTime updateAt;

    public enum TransactionType {
        INCOME,
        EXPENSE
    }


}
