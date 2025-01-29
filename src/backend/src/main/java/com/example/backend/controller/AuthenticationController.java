package com.example.backend.controller;

import com.example.backend.service.UserService;
import com.example.backend.utilities.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/authenticate")
public class AuthenticationController
{
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/")
    public ResponseEntity<String> authenticate(@RequestBody String token)
    {
        String username = jwtUtil.extractUsername(token);
        if (jwtUtil.validateToken(token, username))
        {
            return ResponseEntity.ok("Token valid");
        }
        return ResponseEntity
            .status(401)
            .body("Token either expired or invalid");
    }
}
