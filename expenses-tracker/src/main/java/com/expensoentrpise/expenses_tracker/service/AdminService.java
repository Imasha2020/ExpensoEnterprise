package com.expensoentrpise.expenses_tracker.service;

import com.expensoentrpise.expenses_tracker.dto.UserResponse;
import com.expensoentrpise.expenses_tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    public UserRepository userRepository;

    //************************************************//
    //GET ALL USERS//
    //************************************************//
    public List<UserResponse> getAllUsers(){
        return userRepository.findAll()
                .stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getRole().name()
                ))
                .toList();
    }
}
