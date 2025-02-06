package com.example.backend.model;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.List;
import java.util.HashSet;
import java.util.ArrayList;

@Entity
@Table
public class QuizInstance 
{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="quiz_instance_id")
  private long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="quiz_id")
  @JsonBackReference
  private Quiz quiz;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  private LocalDateTime startTime;

  private int totalQuestions;
  private int lives;
  private Set<Question> completedQuestions;

  @OneToMany(mappedBy = "quizInstance", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Answer> userAnswers;
  
  public QuizInstance(User user, Quiz quiz)
  {
    this.user = user;
    this.quiz = quiz;
    this.lives = 3;
    this.startTime = LocalDateTime.now();
    this.completedQuestions = new HashSet<>();
    this.userAnswers = new ArrayList<>();
    findTotalQuestions();
  }

  public void findTotalQuestions()
  {
    this.totalQuestions = quiz.getQuestions().size();
  }

  public long getId()
  {
    return id;
  }

  public Quiz getQuiz()
  {
    return quiz;
  }

  public User getUser()
  {
    return user;
  }

  public LocalDateTime getStartTime()
  {
    return startTime;
  }

  public int getTotalQuestions()
  {
    return totalQuestions;
  }

  public int getLives()
  {
    return lives;
  }

  public Set<Question> getCompletedQuestions()
  {
    return completedQuestions;
  }

  public void setTotalQuestions(int newTotalQuestions)
  {
    this.totalQuestions = newTotalQuestions;
  }

  public void setLives(int newLives)
  {
    this.lives = newLives;
  }

  public void setCompletedQuestions(Set<Question> newCompletedQuestions)
  {
    this.completedQuestions = newCompletedQuestions;
  }
}
