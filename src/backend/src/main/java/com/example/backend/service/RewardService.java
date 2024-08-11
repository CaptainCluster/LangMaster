package com.example.backend.service;
import com.example.backend.repository.RewardRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RewardService
{
    @Autowired
    private RewardRepository rewardRepository;
}
