package com.dailylog.dailylogapp.service;

import com.dailylog.dailylogapp.dto.AuthRequest;
import com.dailylog.dailylogapp.dto.AuthResponse;
import com.dailylog.dailylogapp.dto.RegisterRequest;
import com.dailylog.dailylogapp.model.User;
import com.dailylog.dailylogapp.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(AuthRequest authRequest, HttpSession session) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                authRequest.getUsername(),
                authRequest.getPassword()
            )
        );

        SecurityContext context = SecurityContextHolder.getContext();
        context.setAuthentication(authentication);

        session.setAttribute(
            HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
            context
        );

        User user = userRepository.findByUsername(authRequest.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));

        return AuthResponse.builder()
            .token("authenticated")
            .user(user)
            .build();
    }

    public AuthResponse register(RegisterRequest registerRequest, HttpSession session) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
            .username(registerRequest.getUsername())
            .email(registerRequest.getEmail())
            .password(passwordEncoder.encode(registerRequest.getPassword()))
            .build();

        userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                registerRequest.getUsername(),
                registerRequest.getPassword()
            )
        );

        SecurityContext context = SecurityContextHolder.getContext();
        context.setAuthentication(authentication);

        session.setAttribute(
            HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
            context
        );

        return AuthResponse.builder()
            .token("authenticated")
            .user(user)
            .build();
    }

    public void logout() {
        SecurityContextHolder.clearContext();
    }

    public AuthResponse getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return AuthResponse.builder()
            .token("authenticated")
            .user(user)
            .build();
    }
}
