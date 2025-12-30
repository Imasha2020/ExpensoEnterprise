package com.expensoentrpise.expenses_tracker.service;

import com.expensoentrpise.expenses_tracker.dto.UserResponse;
import com.expensoentrpise.expenses_tracker.exception.DatabaseException;
import com.expensoentrpise.expenses_tracker.exception.UserNotFoundException;
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
        try{
            List<UserResponse> users = userRepository.findAll()
                    .stream()
                    .map(user-> new UserResponse(
                            user.getId(),
                            user.getUsername() ,
                            user.getEmail() ,
                            user.getRole().name()
                    ))
                    .toList();

            if(users.isEmpty()){
                throw new UserNotFoundException("No users found in the System");
            }

            return users;

        }catch(UserNotFoundException ex){
            throw ex;
        }catch(Exception ex){
            throw new DatabaseException("Failed to retrieve users");
        }
    }


}
