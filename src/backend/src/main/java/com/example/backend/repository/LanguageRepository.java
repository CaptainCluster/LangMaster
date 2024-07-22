package com.example.backend.repository;

import com.example.backend.model.Language;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LanguageRepository extends JpaRepository<Language, Long> {
    @Override
    Optional<Language> findById(Long id);

    Optional<Language> findByName(String name);

    @Override
    List<Language> findAll();
}
