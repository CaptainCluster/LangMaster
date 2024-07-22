package com.example.backend.controller;

import com.example.backend.model.Quiz;
import com.example.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    QuizService quizService;

    @PostMapping("/")
    public ResponseEntity<Quiz> postNewQuiz(@RequestBody String name) {

        // TODO: Make sure the quiz name is unique

        quizService.createQuiz(name);
        return ResponseEntity.ok().build();
    }
}
