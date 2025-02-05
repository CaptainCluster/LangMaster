package com.example.backend.controller;

import com.example.backend.input.QuizInput;
import com.example.backend.model.Quiz;
import com.example.backend.model.QuizInstance;
import com.example.backend.result.QuizResult;
import com.example.backend.service.QuizInstanceService;
import com.example.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reward")
public class QuizInstanceController
{
  @Autowired
  QuizInstanceService quizInstanceService;
  
  @PostMapping("/create")
  public ResponseEntity<QuizInstance> createInstance(@RequestBody long quizId, long userId)
  {
     
    return ResponseEntity.ok().build();
  }
}
