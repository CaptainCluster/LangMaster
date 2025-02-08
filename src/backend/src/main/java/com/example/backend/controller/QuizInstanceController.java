package com.example.backend.controller;

import com.example.backend.input.IdInput;
import com.example.backend.input.InstanceAnswerSubmissionInput;
import com.example.backend.input.InstanceCreationInput;
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
  public ResponseEntity<Long> createInstance(@RequestBody InstanceCreationInput instanceCreationInput)
  {
    Long quizId = instanceCreationInput.getQuizId();
    Long userId = instanceCreationInput.getUserId();
    String username = instanceCreationInput.getUsername();

    System.out.println(quizId + " " + userId + " " + username);

    if (quizId == null || (userId == null && username == null))
    {
      return ResponseEntity.badRequest().build();
    }

    QuizInstance quizInstance;
    if (userId == null)
    {
      quizInstance = quizInstanceService.findByQuizIdAndUsername(quizId, username);
    }
    else
    {
      quizInstance = quizInstanceService.findByQuizIdAndUserId(quizId, userId);
    }

    if (quizInstance == null)
    {
      if (userId == null)
      {
        if(quizInstanceService.createQuizInstanceWithUsername(quizId, username))
        {
          quizInstance = quizInstanceService.findByQuizIdAndUsername(quizId, username);
          if (quizInstance == null)
          {
            return ResponseEntity.badRequest().build();
          }
          return ResponseEntity.ok(quizInstance.getId());
        }
        return ResponseEntity.badRequest().build();
      }

      if (quizInstanceService.createQuizInstance(quizId, userId))
      {
        quizInstance = quizInstanceService.findByQuizIdAndUserId(quizId, userId);
        if (quizInstance == null)
        {
          return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(quizInstance.getId());
      }
      return ResponseEntity.badRequest().build();
    }
    quizInstanceService.resetInstance(quizInstance);
    return ResponseEntity.ok(quizInstance.getId());
  }

  @PostMapping("/submission")
  public ResponseEntity<QuizInstanceResult> processSubmission(@RequestBody InstanceAnswerSubmissionInput instanceAnswerSubmissionInput)
  {
    Long quizInstanceId = instanceAnswerSubmissionInput.getQuizInstanceId();
    Long answerId = instanceAnswerSubmissionInput.getAnswerId();

    if (quizInstanceId == null || answerId == null)
    {
      System.out.println("One of the IDs is null when submitting answer.");
      return ResponseEntity.badRequest().build();
    }

    quizInstanceService.processUserSubmission(quizInstanceId, answerId);
    QuizInstance quizInstance = quizInstanceService.findQuizInstanceById(quizInstanceId).orElse(null);
    if (quizInstance == null)
    {
      System.out.println("Did not find quiz instance.");
      return ResponseEntity.badRequest().build();
    }

    // Sending the results to the client
    QuizInstanceResult quizInstanceResult = new QuizInstanceResult(quizInstance.getLives());
    return ResponseEntity.ok(quizInstanceResult);
  }

  /**
   * Sending a random question to the client
   */ 
  @GetMapping("/random/{quizInstanceId}")
  public ResponseEntity<QuestionResult> fetchRandomQuestion(@PathVariable("quizInstanceId") Long quizInstanceId)
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

  @GetMapping("/core/{idInput}")
  public ResponseEntity<QuizInstanceResult> getCoreInstanceInformation(@PathVariable("idInput") Long idInput)
  {
    System.out.println("input: " + idInput);
    if (idInput == null)
    {
      return ResponseEntity.badRequest().build();
    }
    QuizInstance quizInstance = quizInstanceService.findQuizInstanceById(idInput).orElse(null);
    if (quizInstance == null)
    {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok(quizInstanceService.convertInstanceToResult(quizInstance));
  }
}
