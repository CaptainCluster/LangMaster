package com.example.backend.result;
import com.example.backend.model.Answer;
import java.util.Set;

public class QuestionResult
{
  private String title;
  private Set<Answer> answers;

  public String getTitle()
  {
    return title;
  }

  public Set<Answer> getAnswers()
  {
    return answers;
  }

  public void setTitle(String title)
  {
    this.title = title;
  }

  public void setAnswers(Set<Answer> answers)
  {
    this.answers = answers;
  }
}
