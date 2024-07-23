package com.example.backend.controller;

import com.example.backend.model.Question;
import com.example.backend.model.Quiz;
import com.example.backend.repository.QuizRepository;
import com.example.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;
import java.util.Set;

@RestController
@RequestMapping("/api/question")
public class QuestionController {

    @Autowired
    QuizService quizService;

    @GetMapping("/random")
    public ResponseEntity<Question> getRandomQuestion(@RequestBody String quizName) {

        // Fetching all the questions of the current quiz
        Set<Question> questions = quizService.findQuizzes(quizName);

        // Selecting one of the questions
        Question question = questions.stream().skip(new Random().nextInt(questions.size())).findFirst().orElse(null);
        if (question == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(question);
    }
}
