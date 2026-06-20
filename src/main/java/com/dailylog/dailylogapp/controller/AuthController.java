package com.dailylog.dailylogapp.controller;

import com.dailylog.dailylogapp.dto.AuthRequest;
import com.dailylog.dailylogapp.dto.AuthResponse;
import com.dailylog.dailylogapp.dto.RegisterRequest;
import com.dailylog.dailylogapp.service.AuthService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest, HttpSession session) {
        return ResponseEntity.ok(authService.login(authRequest, session));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest, HttpSession session) {
        return ResponseEntity.ok(authService.register(registerRequest, session));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.invalidate();
        authService.logout();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse> getCurrentUser() {
        return ResponseEntity.ok(authService.getCurrentUser());
    }
}
