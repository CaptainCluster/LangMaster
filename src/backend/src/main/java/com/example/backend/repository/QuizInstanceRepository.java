package com.example.backend.repository;
import com.example.backend.model.QuizInstance;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizInstanceRepository extends JpaRepository<QuizInstance, Long>
{
   
}
