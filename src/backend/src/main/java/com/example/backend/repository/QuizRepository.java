package com.example.backend.repository;

import com.example.backend.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz, Long>
{
    Optional<Quiz> findByName(String quiz);
}
