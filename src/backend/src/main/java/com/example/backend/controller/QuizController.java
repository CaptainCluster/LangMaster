package com.example.backend.controller;

import com.example.backend.input.QuizInput;
import com.example.backend.model.Quiz;
import com.example.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuizController
{
    @Autowired
    QuizService quizService;

    @GetMapping("/")
    public ResponseEntity<Quiz> getQuiz(@RequestBody String name)
    {
        Quiz quiz = quizService.findQuiz(name);

        // Making sure the quiz exists.
        if (quiz == null)
        {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(quiz);
    }

    @GetMapping("/byid/{name}")
    public ResponseEntity<Long> getQuizId(@PathVariable String name)
    {
        Quiz quiz = quizService.findQuiz(name);
        if (quiz == null)
        {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(quiz.getId());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Quiz>
  
    @GetMapping("/all")
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
      return ResponseEntity.ok().body(quizService.getAllQuizzes());
    }

    @PostMapping("/")
    public ResponseEntity<Quiz> postQuiz(@RequestBody String name)
    {
        // Attempting to save a new Quiz obj. Returns boolean based on success.
        boolean status = quizService.createQuiz(name);
        if(!status)
        {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @PutMapping("/")
    public ResponseEntity<Quiz> putQuiz(@RequestBody QuizInput quizInput)
    {
        System.out.println(quizInput.getTitle());
        // Fetching the Quiz obj that matches the existing one
        Quiz quiz = quizService.findQuiz(quizInput.getTitle());
        if (quiz == null)
        {
            return ResponseEntity.badRequest().build();
        }

        quizService.putContentToQuiz(quiz, quizInput);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/")
    public ResponseEntity<Quiz> deleteQuiz(@RequestBody String name)
    {
        Quiz quiz = quizService.findQuiz(name);
        if (quiz == null)
        {
            return ResponseEntity.badRequest().build();
        }
        quizService.deleteQuiz(quiz);

        return ResponseEntity.ok().build();
    }
}
