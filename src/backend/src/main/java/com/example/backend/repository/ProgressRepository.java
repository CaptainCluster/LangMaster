package com.example.backend.repository;

import com.example.backend.model.Progress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgressRepository extends JpaRepository<Progress, Long>
{
    
}
