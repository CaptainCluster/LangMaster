package com.example.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/user/register")
    public User registerUser(@RequestBody User user) {
        return userRepository.save(user);
    }
    
}
