package com.example.backend.service;

import com.example.backend.input.AnswerInput;
import com.example.backend.input.QuestionInput;
import com.example.backend.model.Answer;
import com.example.backend.model.Question;
import com.example.backend.model.Quiz;
import com.example.backend.model.User;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.repository.QuizInstanceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class QuizInstanceService
{
  @Autowired
  QuizInstanceRepository quizInstanceRepository;

  @Autowired 
  QuizService quizService;

  @Autowired
  UserService userService;

  public boolean createQuizInstance(long quizId, long userId)
  {
    Quiz quiz = quizService.findQuizById(quizId);
    if (quiz == null) 
    {
      System.out.println("No quiz with the id " + quizId + " found.");
      return false;
    }
    User user = userService.findUserById(userId);
    if (user == null)
    {
      System.out.println("No user with the id " + userId + " found.");
      return false; 
    }

    return true;
  }
}
