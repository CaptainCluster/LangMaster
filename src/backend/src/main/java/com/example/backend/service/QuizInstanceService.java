package com.example.backend.service;

import com.example.backend.model.Answer;
import com.example.backend.model.Question;
import com.example.backend.model.Quiz;
import com.example.backend.model.QuizInstance;
import com.example.backend.model.User;
import com.example.backend.repository.QuizInstanceRepository;

import java.util.*;

import com.example.backend.result.QuizInstanceResult;
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

  @Autowired
  QuestionService questionService; 

  @Autowired
  AnswerService answerService;

  /**
   * Making a new instance based on the IDs of both the quiz and the user
   * Returns false if quiz/user does not exist
   * Returns true if the instance has been created
   */ 
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

    QuizInstance quizInstance = findByQuizIdAndUserId(quizId, userId);
    if (quizInstance != null)
    {
      resetInstance(quizInstance);
    }
    else
    {
      quizInstance = new QuizInstance(user, quiz);
    }
    quizInstanceRepository.save(quizInstance);
    return true;
  }

  public boolean createQuizInstanceWithUsername(long quizId, String username)
  {
    long userId = userService.getIdByUsername(username);

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

    QuizInstance quizInstance = findByQuizIdAndUserId(quizId, userId);
    if (quizInstance != null)
    {
      resetInstance(quizInstance);
    }
    else
    {
      quizInstance = new QuizInstance(user, quiz);
    }
    quizInstanceRepository.save(quizInstance);
    return true;
  }

  /**
   * Checking whether the user answer was correct.
   * Correct? Returning true.
   * False? Returning false and taking one life from the user (if the instance exists).
   */ 
  public boolean processUserSubmission(long quizInstanceId, long questionId, long answerId)
  {
    Answer answer = answerService.getAnswerById(answerId);
    
    Optional<QuizInstance> optionalQuizInstance = findQuizInstanceById(quizInstanceId);
    if (optionalQuizInstance.isEmpty())
    {
      return false;
    }
    QuizInstance quizInstance = optionalQuizInstance.get();
    
    // Incorrect answer => taking a life
    if (!answer.getIsCorrect())
    {
      quizInstance.setLives(quizInstance.getLives() - 1);
      quizInstanceRepository.save(quizInstance);
      return false;
    }

    // Upon a correct answer, the question will be marked as complete
    Question question = questionService.getById(questionId);
    quizInstance.getCompletedQuestions().add(question);
    quizInstanceRepository.save(quizInstance);
    return true;
  }

  public Optional<QuizInstance> findQuizInstanceById(long quizInstanceId) 
  {
    return quizInstanceRepository.findById(quizInstanceId);
  }

  /**
   * Ensuring the client has enough lives left to continue the quiz.
   * If no lives remain, false is returned and it is game over.
   * If there are still lives remaining, true is returned.
   */ 
  public boolean inspectLives(QuizInstance quizInstance)
  {
    if (!(quizInstance.getLives() <= 0))
    {
      return false;
    }
    return true;
  }

  public QuizInstance findByQuizIdAndUserId(long quizId, long userId)
  {
    List<QuizInstance> quizInstances = quizInstanceRepository.findAll();
    for (QuizInstance quizInstance : quizInstances)
    {
      // If a matching instance is found, it will be reset and returned
      if (quizInstance.getQuiz().getId() == quizId && quizInstance.getUser().getId() == userId)
      {
        resetInstance(quizInstance);
        return quizInstance;
      }
    }
    return null;
  }

  public QuizInstance findByQuizIdAndUsername(long quizId, String username)
  {
    long userId = userService.getIdByUsername(username);
    List<QuizInstance> quizInstances = quizInstanceRepository.findAll();
    for (QuizInstance quizInstance : quizInstances)
    {
      // If a matching instance is found, it will be reset and returned
      if (quizInstance.getQuiz().getId() == quizId && quizInstance.getUser().getId() == userId)
      {
        resetInstance(quizInstance);
        return quizInstance;
      }
    }
    return null;
  }

  /**
   * Resetting the instance so that it is in a state where it can be 
   * restarted.
   */ 
  public void resetInstance(QuizInstance quizInstance)
  {
    int defaultLives = 3;
    quizInstance.setLives(defaultLives);
    quizInstance.setCompletedQuestions(new HashSet<>());
    quizInstance.findTotalQuestions();
  }

  public Question selectRandomQuestion(QuizInstance quizInstance)
  {
    // Ensuring there are questions left to be completed.
    if (quizInstance.getCompletedQuestions().size() == quizInstance.getQuiz().getQuestions().size())
    {
      System.out.println("All questions have been completed!");
      return null;
    }
    
    while (true)
    {
      int listSize = quizInstance.getQuiz().getQuestions().size();
      Random random = new Random();
      List<Question> conversion = new ArrayList<>(quizInstance.getQuiz().getQuestions());
      Question randomQuestion = conversion.get(random.nextInt(listSize));

      if (quizInstance.getCompletedQuestions().contains(randomQuestion))
      {
        continue;
      }
      return randomQuestion;
    }
  }

  public QuizInstanceResult convertInstanceToResult(QuizInstance quizInstance)
  {
    QuizInstanceResult quizInstanceResult = new QuizInstanceResult();
    quizInstanceResult.setId(quizInstance.getId());
    quizInstanceResult.setTotalQuestions(quizInstance.getTotalQuestions());
    quizInstanceResult.setLives(quizInstance.getLives());
    return quizInstanceResult;
  }
}
