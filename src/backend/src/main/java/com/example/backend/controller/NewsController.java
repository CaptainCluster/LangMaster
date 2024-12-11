package com.example.backend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.model.News;
import com.example.backend.service.NewsService;

@RestController
@RequestMapping("/api/news")
public class NewsController 
{
  @Autowired
  private NewsService newsService;
  
  @GetMapping("/latest")
  public ResponseEntity<News> getLatestNews()
  {
    News latestNews = newsService.getLatestNews();
    if (latestNews == null)
    {
      return ResponseEntity.badRequest().build();   
    }
    return ResponseEntity.ok(latestNews);
  }
}
