package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.result.LoginResult;
import com.example.backend.result.ProfileResult;
import com.example.backend.service.UserService;
import com.example.backend.utilities.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController
{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user)
    {
        userService.createUser(user);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResult> loginUser(@RequestBody User user)
    {
        LoginResult loginResult = new LoginResult(false);
        boolean validCredentials = userService.checkCredentials(user);

        // If credentials are not valid, user is notified.
        if (validCredentials)
        {
            String jwtToken = jwtUtil.createJwt(user.getUsername());

            loginResult.setSuccess(true);
            loginResult.setToken(jwtToken);
        }
        return ResponseEntity.ok().body(loginResult);
    }

    //TODO: Implement requirement for JWT token
    @GetMapping("/profile/{username}")
    public ResponseEntity<ProfileResult> getProfile(@PathVariable String username)
    {
        ProfileResult profileResult = new ProfileResult(false);
        User user = userService.findMatchingUser(username);

        if (user != null)
        {
           profileResult.setSuccess(true);
           profileResult.setUsername(user.getUsername());
           profileResult.setBio(user.getBio());
           profileResult.setLanguages(user.getLanguages());
        }

        return ResponseEntity.ok().body(profileResult);
    }
}
