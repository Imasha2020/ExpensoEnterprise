package com.expensoentrpise.expenses_tracker.config;

// Spring Security classes import කරනවා
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// CORS related classes
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

// ==============================
// Spring configuration class එක
// ==============================
@Configuration               // මේ class එක Spring configuration එකක් කියලා කියන annotation
@EnableWebSecurity            // Spring Security enable කරන annotation
public class SecurityConfig {

    // JWT token check කරන custom filter එක inject කරනවා
    @Autowired
    private JwtAuthenticationFilter jwtFilter;

    // ==============================
    // Main Security Filter Chain
    // ==============================
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                // CSRF protection disable කරනවා
                // (JWT APIs වලට CSRF අවශ්‍ය නැති නිසා)
                .csrf(csrf -> csrf.disable())

                // CORS configuration apply කරනවා
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // API endpoints වල authorization rules define කරනවා
                .authorizeHttpRequests(auth -> auth

                        // ----------------
                        // Public endpoints
                        // ----------------
                        // /api/auth/** (login, register වගේ APIs)
                        // authentication නැතිව access කරන්න පුළුවන්
                        .requestMatchers("/api/auth/**").permitAll()

                        // ----------------
                        // Admin only APIs
                        // ----------------
                        // /api/admin/** endpoints
                        // ADMIN role තියෙන user ලට විතරයි
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // ----------------
                        // User protected APIs
                        // ----------------
                        // /api/transactions/**
                        // USER role තියෙන user ලට විතරයි
                        .requestMatchers("/api/transactions/**").hasRole("USER")

                        // ----------------
                        // Other all APIs
                        // ----------------
                        // ඉතිරි සියලු request වලට authentication අනිවාර්යයි
                        .anyRequest().authenticated()
                )

                // JWT filter එක
                // UsernamePasswordAuthenticationFilter එකට කලින් add කරනවා
                // (request එක controller එකට යන්න කලින් token verify කරන්න)
                .addFilterBefore(
                        jwtFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        // Final security configuration build කර return කරනවා
        return http.build();
    }

    // ==============================
    // CORS Configuration
    // ==============================
    /**
     * React frontend එකෙන් API calls allow කරන්න
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        // CORS configuration object එකක් create කරනවා
        CorsConfiguration configuration = new CorsConfiguration();

        // ----------------
        // Allowed origins
        // ----------------
        // API call කරන්න allowed frontend URLs
        configuration.setAllowedOriginPatterns(Arrays.asList(
                "http://localhost:3000",      // React dev server
                "http://localhost:3001",      // Alternative local port
                "https://corehive-frontend-app-cmbucjbga2e6amey.southeastasia-01.azurewebsites.net"
                // Production frontend URL
        ));

        // ----------------
        // Allowed HTTP methods
        // ----------------
        // Frontend එකෙන් භාවිතා කරන්න පුළුවන් HTTP methods
        configuration.setAllowedMethods(Arrays.asList(
                "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"
        ));

        // ----------------
        // Allowed headers
        // ----------------
        // Frontend එකෙන් send කරන්න පුළුවන් headers
        configuration.setAllowedHeaders(Arrays.asList(
                "Authorization",          // JWT token header
                "Content-Type",           // JSON data
                "X-Requested-With",
                "Accept",
                "Origin",
                "Access-Control-Request-Method",
                "Access-Control-Request-Headers"
        ));

        // Authorization header (JWT) allow කරන්න
        configuration.setAllowCredentials(true);

        // Pre-flight (OPTIONS) request cache time (seconds)
        configuration.setMaxAge(3600L);

        // URL based CORS source create කරනවා
        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        // සියලු endpoints (/**) සඳහා මේ CORS configuration apply කරනවා
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
