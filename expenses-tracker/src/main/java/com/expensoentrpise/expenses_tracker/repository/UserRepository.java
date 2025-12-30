package com.expensoentrpise.expenses_tracker.repository;

import com.expensoentrpise.expenses_tracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * 🔐 Used during LOGIN and JWT validation
     * Spring Security → CustomUserDetailsService → calls this
     *
     * @param email user's login email
     * @return Optional<User>
     */
    Optional<User> findByEmail(String email);

    /**
     * 📝 Used during REGISTRATION
     * Prevents duplicate emails
     *
     * @param email user email
     * @return true if email exists
     */
    boolean existsByEmail(String email);

    /**
     * 📝 Optional: Check duplicate username
     * Good for validation in signup
     */
    boolean existsByUsername(String username);

    /**
     * 👮 Admin feature (optional)
     * Fetch only active users
     */
    List<User> findByIsActiveTrue();
}
