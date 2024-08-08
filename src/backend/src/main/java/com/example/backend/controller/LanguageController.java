package com.example.backend.controller;

import com.example.backend.input.LanguageInput;
import com.example.backend.model.Language;
import com.example.backend.service.LanguageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/language")
public class LanguageController
{
    @Autowired
    private LanguageService languageService;

    @GetMapping("/")
    public ResponseEntity<List<Language>> getLanguage()
    {
        return ResponseEntity.ok().body(languageService.getAllLanguages());
    }

    @PostMapping("/commence")
    public ResponseEntity<Language> startNewLanguage(@RequestBody LanguageInput languageInput)
    {
        languageService.addLanguageForUser(languageInput.getUsername(), languageInput.getLanguage());
        return ResponseEntity.ok().build();
    }
}
