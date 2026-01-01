package com.expensoentrpise.expenses_tracker.repository;

import com.expensoentrpise.expenses_tracker.model.Transaction;
import com.expensoentrpise.expenses_tracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    //Get all transaction by User
    List<Transaction> findByUserOrderByTransactionDateDesc(User user);
}
