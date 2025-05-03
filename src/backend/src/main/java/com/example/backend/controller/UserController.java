package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.result.LoginResult;
import com.example.backend.service.UserService;
import com.example.backend.utilities.JwtUtil;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

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
        LoginResult loginResult = new LoginResult();
        try
        {
            boolean validCredentials = userService.checkCredentials(user);
            // If credentials are not valid, user is notified.
            if (validCredentials)
            {
                String jwtToken = jwtUtil.createJwt(user.getUsername());
                loginResult.setSuccess(true);
                loginResult.setToken(jwtToken);
                return ResponseEntity.ok(loginResult);
            }
            loginResult.setSuccess(false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(loginResult);
        }
        catch (Exception exception)
        {
            loginResult.setSuccess(false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(loginResult);
        }

    }

    //TODO: Implement requirement for JWT token
    @GetMapping("/profile/{username}")
    public ResponseEntity<String> getProfile(@PathVariable String username)
    {
        User user = userService.findMatchingUser(username);
        if (user == null)
        {
            return ResponseEntity.badRequest().build();
        }
        
        JSONObject response = new JSONObject();
        response.put("success", true);
        response.put("username", user.getUsername());
        response.put("bio", user.getBio());

        // Fetching the languages user has studied
        Set<String> languages = userService.getUserLanguageNames(user);
        response.put("languages", languages);
        return ResponseEntity.ok(response.toString());
    }
}
