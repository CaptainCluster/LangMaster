package com.example.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.repository.NewsRepository;

@Service
public class NewsService 
{
  @Autowired
  private NewsRepository newsRepository;
}
