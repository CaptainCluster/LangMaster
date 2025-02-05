package com.example.backend.controller;

import com.example.backend.model.QuizInstance;
import com.example.backend.service.QuizInstanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/instance")
public class QuizInstanceController
{
  @Autowired
  QuizInstanceService quizInstanceService;
  
  @PostMapping("/create")
  public ResponseEntity<QuizInstance> createInstance(@RequestBody long quizId, long userId)
  {
    if(!quizInstanceService.createQuizInstance(quizId, userId))
    {
      return ResponseEntity.badRequest().build();
    }     
    return ResponseEntity.ok().build();
  }

  @PostMapping("/submission")
  public ResponseEntity<int> processSubmission()

}
