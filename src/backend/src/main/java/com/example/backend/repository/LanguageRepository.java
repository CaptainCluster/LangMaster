package com.example.backend.repository;

import com.example.backend.model.Language;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LanguageRepository extends JpaRepository<Language, Long>
{
    Optional<Language> findByName(String name);
}
