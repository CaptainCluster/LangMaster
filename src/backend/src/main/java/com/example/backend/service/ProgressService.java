package com.example.backend.service;

import com.example.backend.model.Progress;
import com.example.backend.model.User;
import com.example.backend.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProgressService {
    @Autowired
    private ProgressRepository progressRepository;

    public Progress findProgressWithId(Long id) {
        return progressRepository.findById(id).orElse(null);
    }
}
