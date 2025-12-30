package com.expensoentrpise.expenses_tracker.config;

import com.expensoentrpise.expenses_tracker.service.CustomUserDetailsService;
import com.expensoentrpise.expenses_tracker.util.JwtUtil;
import io.jsonwebtoken.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request ,
            HttpServletResponse response ,
            FilterChain chain
    ) throws IOException, ServletException, java.io.IOException {
        //1) Get Authorization header
        String header = request.getHeader("Authorization");

        if(header !=null && header.startsWith("Bearer ")){
            //2) Remove "Bearer "
            String token = header.substring(7);

            //3) Extract username
            String username = jwtUtil.extractUsername(token);

            //4)Authenticate user
            if(username != null &&
                    SecurityContextHolder.getContext().getAuthentication()==null){
                UserDetails userDetails =
                        userDetailsService.loadUserByUsername(username);

                if(jwtUtil.validateToken(token , userDetails)){
                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails ,
                                    null ,
                                    userDetails.getAuthorities()
                            );

                    SecurityContextHolder.getContext().setAuthentication(auth);

                    // 🔥 VERY IMPORTANT: set userId for controller access
                    Long userId = jwtUtil.extractUserId(token);
                    request.setAttribute("userId", userId);
                }
            }
        }
        //5) Continue request
        chain.doFilter(request , response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return request.getServletPath().startsWith("/api/auth");
    }


}
