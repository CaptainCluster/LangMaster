package com.example.backend.service;

import com.example.backend.model.Quiz;
import com.example.backend.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    /**
     * Creating a Quiz object and saving it
     * @param name The name of the quiz
     */
    public boolean createQuiz(String name) {

        for (Quiz existingQuiz : quizRepository.findAll()) {
            if (existingQuiz.getName().equals(name)) {
                return false;
            }
        }
        Quiz newQuiz = new Quiz(name);
        quizRepository.save(newQuiz);
        return true;
    }

    public Optional<Quiz> findQuiz(String name) {
        return quizRepository.findByName(name);
    }
}
