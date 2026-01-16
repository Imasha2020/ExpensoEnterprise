package com.expensoentrpise.expenses_tracker.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    // Display name
    private String username;

    // Used for login
    private String email;

    // Plain password → will be hashed
    private String password;
}
