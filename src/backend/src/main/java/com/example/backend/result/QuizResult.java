package com.example.backend.result;
import com.example.backend.model.Question;
import com.example.backend.model.Reward;
import com.example.backend.model.Language;

import java.util.Set;

public class QuizResult 
{
  private String name;
  private String description;
  private Language language;
  private Set<Question> questions;
  private Reward reward;

  public QuizResult() {}

  public QuizResult(String name, String description, Language language, Set<Question> questions, Reward reward)
  {
    this.name = name;
    this.description = description;
    this.language = language;
    this.questions = questions;
    this.reward = reward;
  }
  
  public String getName()
  {
    return this.name;
  }
  
  public String getDescription()
  {
    return this.description;
  }

  public Language getLanguage()
  {
    return this.language;
  }

  public Set<Question> getQuestions()
  {
    return this.questions;
  }

  public Reward getReward()
  {
    return this.reward;
  }

  public void setName(String name)
  {
    this.name = name;
  }

  public void setDescription(String description)
  {
    this.description = description;
  }

  public void setLanguage(Language language)
  {
    this.language = language;
  }

  public void setQuestions(Set<Question> questions) 
  {
    this.questions = questions;
  }

  public void setReward(Reward reward)
  {
    this.reward = reward;
  }
}
