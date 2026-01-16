package com.expensoentrpise.expenses_tracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    //JWT token
    private String token;

    //Logged-in user info
    private UserResponse user;
}
