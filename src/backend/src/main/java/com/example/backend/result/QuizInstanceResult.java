package com.example.backend.result;

import com.example.backend.model.Question;
import com.example.backend.model.Quiz;

import java.util.Set;

public class QuizInstanceResult
{
  private Quiz quiz;
  private int totalQuestions;
  private int lives;
  private Set<Question> completedQuestions;

  public QuizInstanceResult() {}

  public QuizInstanceResult(int lives)
  {
    this.lives = lives;  
  }

  public Quiz getQuiz() {
    return quiz;
  }

  public int getTotalQuestions() {
    return totalQuestions;
  }

  public Set<Question> getCompletedQuestions() {
    return completedQuestions;
  }

  public int getLives()
  {
    return lives;
  }

  public void setQuiz(Quiz quiz) {
    this.quiz = quiz;
  }

  public void setTotalQuestions(int totalQuestions) {
    this.totalQuestions = totalQuestions;
  }

  public void setLives(int lives) {
    this.lives = lives;
  }

  public void setCompletedQuestions(Set<Question> completedQuestions) {
    this.completedQuestions = completedQuestions;
  }
}
