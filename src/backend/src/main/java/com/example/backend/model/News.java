package com.example.backend.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "news", uniqueConstraints = {@UniqueConstraint(columnNames = "content")})
public class News
{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="news_id")
  private long id;

  @Column
  private String content;

  @Column(nullable = false, updatable = false, unique = true)
  private LocalDateTime publicationDate;

  public News() {}

  public News(String content) 
  {
    this.content = content;
  }

  public long getId() 
  {
    return id;
  }

  public String getContent()
  {
    return content;
  }

  public LocalDateTime getPublicationDate()
  {
    return publicationDate;
  }

  public void setId(long id) 
  {
    this.id = id;
  }

  public void setContent(String content)
  {
    this.content = content;
  }

  public void setPublicationDate(LocalDateTime publicationDate)
  {
    this.publicationDate = publicationDate;
  }

  @PrePersist 
  protected void onCreate() 
  { 
    this.publicationDate = LocalDateTime.now(); 
  }
}
