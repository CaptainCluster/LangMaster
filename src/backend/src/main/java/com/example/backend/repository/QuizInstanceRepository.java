package com.example.backend.repository;
import com.example.backend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizInstanceRepository extends JpaRepository<Question, Long>
{
    
}
