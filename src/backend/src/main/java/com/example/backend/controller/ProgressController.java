package com.example.backend.controller;

import com.example.backend.model.Progress;
import com.example.backend.model.User;
import com.example.backend.service.ProgressService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private UserService userService;

    @Autowired
    private ProgressService progressService;


    @GetMapping("/")
    public ResponseEntity<Progress> getProgress(@RequestBody String username) {
        // Fetching the User object
        User user = userService.findMatchingUser(username);
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }

        Progress progress = user.getProgress();
        return ResponseEntity.ok(progress);
    }
}
