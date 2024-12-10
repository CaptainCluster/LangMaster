package com.example.backend.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table
public class News
{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="news_id")
  private long id;

  @Column
  private String content;

  @Column(nullable = false, updatable = false)
  private LocalDateTime publicationDate;

  public long getId() 
  {
    return id;
  }

  public String getContent()
  {
    return content;
  }

  public void setId(long id) 
  {
    this.id = id;
  }

  public void setContent(String content)
  {
    this.content = content;
  }
}
