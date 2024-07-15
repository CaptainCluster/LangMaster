package com.example.backend.user;

import com.example.backend.utilities.JwtUtil;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


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
}
