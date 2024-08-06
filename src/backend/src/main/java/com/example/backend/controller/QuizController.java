package com.example.backend.controller;

import com.example.backend.input.QuizInput;
import com.example.backend.model.Quiz;
import com.example.backend.repository.QuizRepository;
import com.example.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    QuizService quizService;

    @Autowired
    QuizRepository quizRepository;

    @GetMapping("/")
    public ResponseEntity<Quiz> getQuiz(@RequestBody String name) {
        Optional<Quiz> optionalQuiz = quizService.findQuiz(name);

        // Making sure the quiz exists.
        if (optionalQuiz.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(optionalQuiz.get());
    }

    @PostMapping("/")
    public ResponseEntity<Quiz> postQuiz(@RequestBody String name) {
        // Attempting to save a new Quiz obj. Returns boolean based on success.
        boolean status = quizService.createQuiz(name);
        if(!status) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @PutMapping("/")
    public ResponseEntity<Quiz> putQuiz(@RequestBody QuizInput quizInput) {

        // Fetching the Quiz obj that matches the existing one
        Optional<Quiz> optionalQuiz = quizService.findQuiz(quizInput.getName());
        if (optionalQuiz.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Quiz quiz = optionalQuiz.get();

        quizService.addQuestions(quiz, quizInput.getAddQuestions());
        quizService.removeQuestions(quiz, quizInput.getRemoveQuestions());

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/")
    public ResponseEntity<Quiz> deleteQuiz(@RequestBody String name) {
        Optional<Quiz> optionalQuiz = quizService.findQuiz(name);
        if (optionalQuiz.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Quiz quiz = optionalQuiz.get();
        quizService.deleteQuiz(quiz);

        return ResponseEntity.ok().build();
    }
}
