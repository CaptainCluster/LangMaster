package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.model.News;
import com.example.backend.repository.NewsRepository;

import java.util.List;

@Service
public class NewsService 
{
  @Autowired
  private NewsRepository newsRepository;

  public News getLatestNews() 
  {
    List<News> newsList = newsRepository.findAll();

    // In case the database contains no news
    if (newsList.isEmpty() || newsList == null)
    {
      return null;
    }
    
    News mostRecentNews = newsList.getFirst(); 

    // Finding the latest news
    for (News news : newsList) 
    {
      if (news == null) 
      {
        System.out.println("WARNING! A null value detected in the 'News' table!");
        continue;
      }

      if (news.getPublicationDate().isAfter(mostRecentNews.getPublicationDate()))
      {
        mostRecentNews = news;
      }
    }
    return mostRecentNews;
  }
}
