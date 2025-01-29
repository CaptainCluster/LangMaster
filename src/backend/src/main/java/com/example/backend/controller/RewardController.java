package com.example.backend.controller;

import com.example.backend.model.Reward;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reward")
public class RewardController
{
    @GetMapping("/")
    public ResponseEntity<Reward> getReward(@RequestBody String username)
    {
        return ResponseEntity.ok().build();
    }
}