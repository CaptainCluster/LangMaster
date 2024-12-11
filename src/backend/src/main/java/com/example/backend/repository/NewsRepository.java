package com.example.backend.repository;

import com.example.backend.model.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long>
{

}
