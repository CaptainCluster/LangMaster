package com.example.backend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.backend.service.NewsService;

@RestController
@RequestMapping("/api/news")
public class NewsController
{
  @Autowired
  private NewsService newsService;

  
}
