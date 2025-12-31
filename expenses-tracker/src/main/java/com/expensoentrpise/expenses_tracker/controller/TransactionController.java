package com.expensoentrpise.expenses_tracker.controller;

import com.expensoentrpise.expenses_tracker.dto.UserResponse;
import com.expensoentrpise.expenses_tracker.dto.request.TransactionRequestDTO;
import com.expensoentrpise.expenses_tracker.dto.response.TransactionResponseDTO;
import com.expensoentrpise.expenses_tracker.model.Transaction;
import com.expensoentrpise.expenses_tracker.service.TransactionService;
import com.expensoentrpise.expenses_tracker.util.StandardResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@Slf4j
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    //************************************************//
    //Create A TRANSACTION//
    //************************************************//
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<StandardResponse> createTransaction(@RequestBody TransactionRequestDTO transactionRequestDTO , HttpServletRequest request){
        Long userId = (Long) request.getAttribute("userId");
        TransactionResponseDTO transactionResponseDTO = transactionService.createTransaction(transactionRequestDTO , userId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "Created Transaction Successfully", transactionResponseDTO), HttpStatus.OK
        );
    }
}
