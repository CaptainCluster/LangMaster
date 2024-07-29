package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import com.example.backend.utilities.JwtUtil;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

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
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        userService.createUser(user);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public HashMap<String, String> loginUser(@RequestBody User user) {
        boolean validCredentials = userService.checkCredentials(user);

        HashMap<String, String> response = new HashMap<>();

        // If credentials are not valid, user is notified.
        if (!validCredentials) {
            response.put("msg", "Invalid credentials.");
            return response;
        }

        // Assigning the JWT for successful login
        String jwtToken = jwtUtil.createJwt(user.getUsername());
        response.put("msg", "success");
        response.put("token", jwtToken);

        return response;
    }

    //TODO: Implement requirement for JWT token
    @PostMapping("/profile")
    public ResponseEntity<JSONObject> getProfile(@RequestParam String username) {
        JSONObject response = new JSONObject();
        User user = userService.findMatchingUser(username);

        // Trying to find the user
        if (user == null) {
            response.put("success", false);
        } else {
            response.put("success", true);
            response.put("username", user.getUsername());
            response.put("bio", user.getBio());
            response.put("languages", user.getLanguages());
        }
        return ResponseEntity.ok(response);
    }
}
