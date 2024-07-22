package com.example.backend.service;

import com.example.backend.model.Quiz;
import com.example.backend.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    /**
     * Creating a Quiz object and saving it
     * @param name The name of the quiz
     */
    public void createQuiz(String name) {
        Quiz newQuiz = new Quiz(name);
        quizRepository.save(newQuiz);
    }
}
