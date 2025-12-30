package com.expensoentrpise.expenses_tracker.dto;

import lombok.Data;

@Data
public class LoginRequest {
    // Email entered by user
    private String email;

    // Plain password (used ONLY for comparison)
    private String password;
}
