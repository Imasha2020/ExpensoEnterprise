package com.expensoentrpise.expenses_tracker.service;

import com.expensoentrpise.expenses_tracker.dto.AuthResponse;
import com.expensoentrpise.expenses_tracker.dto.LoginRequest;
import com.expensoentrpise.expenses_tracker.dto.RegisterRequest;
import com.expensoentrpise.expenses_tracker.dto.UserResponse;
import com.expensoentrpise.expenses_tracker.model.User;
import com.expensoentrpise.expenses_tracker.repository.UserRepository;
import com.expensoentrpise.expenses_tracker.security.CustomUserDetails;
import com.expensoentrpise.expenses_tracker.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse login(LoginRequest req){
        User user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(()->new RuntimeException("User not found"));

        if(!encoder.matches(req.getPassword(),  user.getPasswordHash())){
            throw new RuntimeException("Invalid credintials");
        }

        // ✅ USE CustomUserDetails
        CustomUserDetails userDetails = new CustomUserDetails(user);

        String token = jwtUtil.generateToken(userDetails);

        UserResponse userResponse = new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name()
        );

        return new AuthResponse(token, userResponse);
    }

    public void register(RegisterRequest req) {

        // 1️⃣ Check email already exists
        if (userRepo.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // 2️⃣ Check username already exists
        if (userRepo.existsByUsername(req.getUsername())) {
            throw new RuntimeException("Username already taken");
        }

        // 3️⃣ Create User entity
        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());

        // 🔐 Hash password before saving
        user.setPasswordHash(encoder.encode(req.getPassword()));

        // ✅ Set default role
        user.setRole(User.Role.USER);

        // ✅ Activate account
        user.getIsActive();

        // 4️⃣ Save user to database
        userRepo.save(user);
    }
}
