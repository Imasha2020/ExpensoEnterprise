package com.expensoentrpise.expenses_tracker.controller;

import com.expensoentrpise.expenses_tracker.dto.UserResponse;
import com.expensoentrpise.expenses_tracker.repository.UserRepository;
import com.expensoentrpise.expenses_tracker.service.AdminService;
import com.expensoentrpise.expenses_tracker.util.StandardResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@Slf4j
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminService adminServiceService;


    //************************************************//
    //GET ALL USERS//
    //************************************************//
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StandardResponse> getAllUsers(){
        List<UserResponse> users = adminServiceService.getAllUsers();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "All users fetched Successfully", users), HttpStatus.OK
        );
    }

}
