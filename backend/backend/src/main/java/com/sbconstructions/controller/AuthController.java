package com.sbconstructions.controller;

import com.sbconstructions.repository.UserRepository;
import com.sbconstructions.entity.User;
import com.sbconstructions.security.JwtService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public record LoginRequest(@NotBlank @Email String email, @NotBlank String password) {}
    public record LoginResponse(String token, String name, String role) {}

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest r) {
        User u = users.findByEmail(r.email())
                .filter(User::isActive)
                .filter(x -> encoder.matches(r.password(), x.getPassword()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));
        return new LoginResponse(jwt.generate(u.getEmail(), u.getRole()), u.getName(), u.getRole());
    }
}