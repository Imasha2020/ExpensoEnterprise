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
import org.springframework.web.bind.annotation.PathVariable;

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

    //************************************************//
    //GET ONE TRANSACTION BY ID//
    //************************************************//
    public TransactionResponseDTO getSingleTransaction(Long userId, Long id) {
        // 1️⃣ Get User entity (FK requirement)
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found with id: " + userId)
                );

        // 2️⃣ Fetch transaction by ID
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Transaction not found with id: " + id)
                );

        // 3️⃣ Ownership check (VERY IMPORTANT 🔐)
        if (!transaction.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not allowed to access this transaction");
        }

        // 4️⃣ Convert Entity → Response DTO
        TransactionResponseDTO dto = new TransactionResponseDTO();

        dto.setId(transaction.getId());
        dto.setTitle(transaction.getTitle());
        dto.setAmount(transaction.getAmount());
        dto.setType(transaction.getType().name());
        dto.setDescription(transaction.getDescription());
        dto.setTransactionDate(transaction.getTransactionDate());
        dto.setCreatedAt(transaction.getCreateAt());
        dto.setUpdatedAt(transaction.getUpdateAt());

        if (transaction.getCategory() != null) {
            dto.setCategoryId(transaction.getCategory().getId());
            dto.setCategoryName(transaction.getCategory().getName());
        }

        return dto;
    }

    //************************************************//
    //UPDATE TRANSACTION BY ID//
    //************************************************//
    public TransactionResponseDTO updateTransaction(Long userId, Long id, TransactionRequestDTO transactionRequestDTO) {
        // 1️⃣ Get User entity (FK requirement)
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found with id: " + userId)
                );

        // 2️⃣ Fetch transaction by ID
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Transaction not found with id: " + id)
                );

        // 3️⃣ Ownership check (VERY IMPORTANT 🔐)
        if (!transaction.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not allowed to access this transaction");
        }

        // 4️⃣ Validate & fetch category (optional)
        Category category = null;
        if (transactionRequestDTO.getCategoryId() != null) {
            category = categoryRepository.findById(transactionRequestDTO.getCategoryId())
                    .orElseThrow(() ->
                            new RuntimeException("Category not found with id: "
                                    + transactionRequestDTO.getCategoryId())
                    );
        }

        // 5️⃣ Update transaction fields
        transaction.setTitle(transactionRequestDTO.getTitle());
        transaction.setAmount(transactionRequestDTO.getAmount());

        try {
            transaction.setType(
                    Transaction.TransactionType
                            .valueOf(transactionRequestDTO.getType())
            );
        } catch (IllegalArgumentException ex) {
            throw new RuntimeException("Invalid transaction type");
        }

        transaction.setCategory(category);
        transaction.setDescription(transactionRequestDTO.getDescription());
        transaction.setTransactionDate(transactionRequestDTO.getTransactionDate());

        // 6️⃣ Save updated transaction
        Transaction updatedTransaction = transactionRepository.save(transaction);

        // 7️⃣ Convert Entity → Response DTO
        TransactionResponseDTO response = new TransactionResponseDTO();

        response.setId(updatedTransaction.getId());
        response.setTitle(updatedTransaction.getTitle());
        response.setAmount(updatedTransaction.getAmount());
        response.setType(updatedTransaction.getType().name());
        response.setDescription(updatedTransaction.getDescription());
        response.setTransactionDate(updatedTransaction.getTransactionDate());
        response.setCreatedAt(updatedTransaction.getCreateAt());
        response.setUpdatedAt(updatedTransaction.getUpdateAt());

        if (updatedTransaction.getCategory() != null) {
            response.setCategoryId(updatedTransaction.getCategory().getId());
            response.setCategoryName(updatedTransaction.getCategory().getName());
        }

        return response;

    }

    //************************************************//
    //DELETE A TRANSACTION BY ID//
    //************************************************//
    public void deleteTransaction(Long userId, Long id) {
        // 1️⃣ Get User entity (FK requirement)
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found with id: " + userId)
                );

        // 2️⃣ Fetch transaction by ID
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Transaction not found with id: " + id)
                );

        // 3️⃣ Ownership check (VERY IMPORTANT 🔐)
        if (!transaction.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not allowed to access this transaction");
        }

        // 4️⃣ Delete transaction
        transactionRepository.delete(transaction);
    }
}
