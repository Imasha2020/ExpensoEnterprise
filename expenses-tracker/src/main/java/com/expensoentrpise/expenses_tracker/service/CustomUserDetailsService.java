package com.expensoentrpise.expenses_tracker.service;

import com.expensoentrpise.expenses_tracker.model.User;
import com.expensoentrpise.expenses_tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    /**
     * This method is automatically called by Spring Security
     * whenever authentication is required.
     *
     * @param username → we pass EMAIL as username
     */
    @Override
    public UserDetails loadUserByUsername(String username)
        throws UsernameNotFoundException{

        //1) Find user from database using email
        User user = userRepository.findByEmail(username)
                .orElseThrow(()->
                        new UsernameNotFoundException("User not found: "+username)
                );

        // 2️) Convert our User entity to Spring Security UserDetails
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),                // username
                user.getPasswordHash(),         // hashed password
                user.isActive(),                // enabled
                true,                            // accountNonExpired
                true,                            // credentialsNonExpired
                true,                            // accountNonLocked
                List.of(
                        new SimpleGrantedAuthority("ROLE_" + user.getRole())
                )
        );
    }


}
