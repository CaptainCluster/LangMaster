package com.example.backend.controller;

import com.example.backend.model.Question;
import com.example.backend.model.QuizInstance;
import com.example.backend.result.QuestionResult;
import com.example.backend.result.QuizInstanceResult;
import com.example.backend.service.QuestionService;
import com.example.backend.service.QuizInstanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;

@RestController
@RequestMapping("/api/instance")
public class QuizInstanceController
{
  @Autowired
  QuizInstanceService quizInstanceService;

  @Autowired
  QuestionService questionService;
  
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
  public ResponseEntity<QuizInstanceResult> processSubmission(@RequestBody long quizInstanceId, long questionId, long answerId)
  {
    quizInstanceService.processUserSubmission(quizInstanceId, questionId, answerId);
    QuizInstance quizInstance = quizInstanceService.findQuizInstanceById(quizInstanceId).orElse(null);
    if (quizInstance == null)
    {
      return ResponseEntity.badRequest().build();
    }

    // Sending the results to the client
    QuizInstanceResult quizInstanceResult = new QuizInstanceResult(quizInstance.getLives());
    return ResponseEntity.ok(quizInstanceResult);
  }

  /**
   * Sending a random question to the client
   */ 
  @PostMapping("/random")
  public ResponseEntity<QuestionResult> fetchRandomQuestion(@RequestBody int quizInstanceId)
  {
    Optional<QuizInstance> quizInstance = quizInstanceService.findQuizInstanceById(quizInstanceId);
    if (quizInstance.isEmpty())
    {
      return ResponseEntity.badRequest().build();
    }
    Question question = quizInstanceService.selectRandomQuestion(quizInstance.get());
    QuestionResult questionResult = questionService.convertQuestionToResult(question);

    if (questionResult == null)
    {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok(questionResult);
  }
}
