package com.example.backend.service;

import com.example.backend.model.Language;
import com.example.backend.model.User;
import com.example.backend.repository.LanguageRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class LanguageService {

    @Autowired
    private LanguageRepository languageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public LanguageService(LanguageRepository languageRepository) {
        this.languageRepository = languageRepository;
    }

    public void addLanguageForUser(String username, String languageName) {

        // Making sure the user doesn't already study the language
        boolean foundLanguage = false;

        Optional<User> optionalUser = userRepository.findByUsername(username);
        User user = optionalUser.get();

        for (Language languageObj : user.getLanguages()) {
            if (Objects.equals(languageObj.getName(), languageName)) {
                foundLanguage = true;
                break;
            }
        }
        if (foundLanguage) {
            return;
        }

        // Assigning the new language to user.
        Optional<Language> optionalLanguage = languageRepository.findByName(languageName);
        Language language = optionalLanguage.get();

        user.getLanguages().add(language);
        userRepository.save(user);

        // Assigning the user to the language (in case issues occur)
        // language.getUsers().add(user);
        // languageRepository.save(language);

    }
}
