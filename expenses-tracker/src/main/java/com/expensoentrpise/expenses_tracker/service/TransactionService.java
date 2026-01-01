package com.expensoentrpise.expenses_tracker.service;

import com.expensoentrpise.expenses_tracker.dto.request.TransactionRequestDTO;
import com.expensoentrpise.expenses_tracker.dto.response.TransactionResponseDTO;
import com.expensoentrpise.expenses_tracker.model.Category;
import com.expensoentrpise.expenses_tracker.model.Transaction;
import com.expensoentrpise.expenses_tracker.model.User;
import com.expensoentrpise.expenses_tracker.repository.CategoryRepository;
import com.expensoentrpise.expenses_tracker.repository.TransactionRepository;
import com.expensoentrpise.expenses_tracker.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    //************************************************//
    //Create A TRANSACTION//
    //************************************************//
    @Transactional
    public TransactionResponseDTO createTransaction(TransactionRequestDTO transactionRequestDTO , Long userId) {

        // 1️⃣ Get User entity (FK requirement)
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found with id: " + userId)
                );

        // 2️⃣ Get Category (optional)
        Category category = null;
        if (transactionRequestDTO.getCategoryId() != null) {
            category = categoryRepository.findById(transactionRequestDTO.getCategoryId())
                    .orElseThrow(() ->
                            new RuntimeException("Category not found")
                    );
        }

        // 3️⃣ Create Transaction entity
        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setTitle(transactionRequestDTO.getTitle());
        transaction.setAmount(transactionRequestDTO.getAmount());
        transaction.setType(Transaction.TransactionType.valueOf(transactionRequestDTO.getType()));
        transaction.setCategory(category);
        transaction.setDescription(transactionRequestDTO.getDescription());
        transaction.setTransactionDate(transactionRequestDTO.getTransactionDate());

        // 4️⃣ Save to database
        Transaction savedTransaction = transactionRepository.save(transaction);

        // 5️⃣ Convert to Response DTO
        TransactionResponseDTO response = new TransactionResponseDTO();

        response.setId(savedTransaction.getId());
        response.setTitle(savedTransaction.getTitle());
        response.setAmount(savedTransaction.getAmount());
        response.setType(savedTransaction.getType().name());
        response.setDescription(savedTransaction.getDescription());
        response.setTransactionDate(savedTransaction.getTransactionDate());
        response.setCreatedAt(savedTransaction.getCreateAt());
        response.setUpdatedAt(savedTransaction.getUpdateAt());

        if (savedTransaction.getCategory() != null) {
            response.setCategoryId(savedTransaction.getCategory().getId());
            response.setCategoryName(savedTransaction.getCategory().getName());
        }

        return response;

    }

    //************************************************//
    //GET ALL TRANSACTIONS//
    //************************************************//
    public List<TransactionResponseDTO> getAllTransactions(Long userId) {
        // 1️⃣ Get User entity (FK requirement)
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found with id: " + userId)
                );

        // 2️⃣ Fetch transactions ONLY for this user
        List<Transaction> transactions =
                transactionRepository.findByUserOrderByTransactionDateDesc(user);

        //4 3️⃣ Convert DTO -> Entity
        return transactions.stream()
                .map(transaction -> {
                    TransactionResponseDTO transactionResponseDTO = new TransactionResponseDTO();

                    transactionResponseDTO.setId(transaction.getId());
                    transactionResponseDTO.setTitle(transaction.getTitle());
                    transactionResponseDTO.setAmount(transaction.getAmount());
                    transactionResponseDTO.setType(transaction.getType().name());
                    transactionResponseDTO.setDescription(transaction.getDescription());
                    transactionResponseDTO.setTransactionDate(transaction.getTransactionDate());
                    transactionResponseDTO.setCreatedAt(transaction.getCreateAt());
                    transactionResponseDTO.setUpdatedAt(transaction.getUpdateAt());

                    // Category is optional
                    if (transaction.getCategory() != null) {
                        transactionResponseDTO.setCategoryId(transaction.getCategory().getId());
                        transactionResponseDTO.setCategoryName(transaction.getCategory().getName());
                    }
                    return transactionResponseDTO;
                })
                .toList();   // Returns empty list if no transactions (GOOD)

    }
}
