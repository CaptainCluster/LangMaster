package com.example.backend.service;

import com.example.backend.model.Progress;
import com.example.backend.model.User;
import com.example.backend.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProgressService
{
    @Autowired
    private ProgressRepository progressRepository;

    @Autowired
    private UserService userService;

    public Progress findProgressWithId(Long id)
    {
        return progressRepository.findById(id).orElse(null);
    }

    public Progress getProgressWithUsername(String username)
    {
        User user = userService.findMatchingUser(username);
        if (user == null)
        {
            return null;
        }
        return user.getProgress();
    }

    public void incrementSuccess(Progress progress)
    {
        progress.setSuccesses(progress.getSuccesses() + 1);
        progressRepository.save(progress);
    }

    public void incrementFails(Progress progress)
    {
        progress.setFails(progress.getFails() + 1);
        progressRepository.save(progress);
    }
}
