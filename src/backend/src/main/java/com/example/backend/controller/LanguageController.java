package com.example.backend.controller;

import com.example.backend.model.Language;
import com.example.backend.repository.LanguageRepository;
import com.example.backend.service.LanguageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/language")
public class LanguageController {

    @Autowired
    LanguageRepository languageRepository;

    @Autowired
    LanguageService languageService;

    @PostMapping("/commence")
    public ResponseEntity<Language> startNewLanguage(@RequestBody Map<String, String> reqData) {
        languageService.addLanguageForUser(reqData.get("username"), reqData.get("language"));
        return ResponseEntity.ok().build();
    }
}
