package com.expensoentrpise.expenses_tracker.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    // 🔐 MUST be at least 256 bits for HS256
    private final String SECRET = "my-super-secret-key-for-expenses-tracker-123456";

    //Token validity = 24 hours
    private final long EXPIRATION = 86400000;

    // Convert secret to Key object
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    // Generate JWT
    public String generateToken(UserDetails user){
        return Jwts.builder()
                .setSubject(user.getUsername()) //Token එකේ subject එක ලෙස username / email එක save කරනවා
                .claim("role" , user.getAuthorities()) // User ගේ role / authorities token එක ඇතුළට add කරනවා
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+EXPIRATION))
                .signWith(key ,SignatureAlgorithm.HS256 ) // HS256 algorithm එකෙන් secret key එක භාවිතා කර token එක sign කරනවා
                .compact();// JWT token එක final String එකක් ලෙස generate කරනවා
    }

    // Extract username from token
    public String extractUsername(String token){
        // Token එකෙන් claims extract කරලා
        // subject (username/email) එක return කරනවා
        return getClaims(token).getSubject();
    }

    private Claims getClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(key)   // ✅ SAME key used for signing
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Validate token
    public boolean validateToken(String token , UserDetails user){
        return extractUsername(token).equals(user.getUsername())
                && !isExpired(token);
        // Token එකේ username එක
        // logged-in user ගේ username එකට match වෙනවද කියලා check කරනවා
        // Token එක expire වෙලා නැද්ද කියලා check කරනවා
    }

    private boolean isExpired(String token){
        return getClaims(token).getExpiration().before(new Date());
    }
}
