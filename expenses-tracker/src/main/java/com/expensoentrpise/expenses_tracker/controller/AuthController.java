package com.expensoentrpise.expenses_tracker.controller;

import com.expensoentrpise.expenses_tracker.dto.AuthResponse;
import com.expensoentrpise.expenses_tracker.dto.LoginRequest;
import com.expensoentrpise.expenses_tracker.dto.RegisterRequest;
import com.expensoentrpise.expenses_tracker.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping
    public AuthResponse login(@RequestBody LoginRequest req){
        return authService.login(req);
    }

    @PostMapping("/signup")
    public String register(@RequestBody RegisterRequest req){
        authService.register(req);
        return "Registration successful";
    }
}
