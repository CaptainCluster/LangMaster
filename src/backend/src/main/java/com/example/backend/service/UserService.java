package com.example.backend.service;

import com.example.backend.model.Language;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService
{
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUserById(Long id)
    {
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Entity not found."));
    }

    /**
     * Handling the given User object.
     * Uses bCrypt to hash the password and storing that hash.
     *
     * @param user The User object (most likely from request body)
     */
    public void createUser(User user)
    {
      if (user == null)
      {
        return;
      }

      if (user.getPassword().length() == 0 || user.getUsername().length() == 0) 
      {
        return;
      }

      User newUser = new User();
      newUser.setUsername(user.getUsername());

      // Hashing the password with bCrypt
      BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
      newUser.setPassword(passwordEncoder.encode(user.getPassword()));

      userRepository.save(newUser);
    }

    public void deleteUser(User user)
    {
      if (user != null)
      {
        userRepository.delete(user);
      }
    }

    /**
     * Making sure the credentials are valid for successful authentication.
     * @param loggingUser The user object with the credentials
     */
    public boolean checkCredentials(User loggingUser)
    { 
      // Returning with failure if the passed user is a null value
      if (loggingUser == null)
      {
        return false;
      }

        // Figuring out whether the user exists
        Optional<User> optionalUser = userRepository.findByUsername(loggingUser.getUsername());
        if (optionalUser.isEmpty())
        {
            return false;
        }
        User user = optionalUser.get();

        // Figuring out whether the passwords match.
        return BCrypt.checkpw(loggingUser.getPassword(), user.getPassword());
    }

    public User findMatchingUser(String username)
    {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        return optionalUser.orElse(null);
    }

    public Set<String> getUserLanguageNames(User user)
    {
        Set<String> languages = new HashSet<>();
        for (Language language : user.getLanguages())
        {
            languages.add(language.getName());
        }
        return languages;
    }

    public long getIdByUsername(String username)
    {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty())
        {
            return -1;
        }
        return optionalUser.get().getId();
    }

    public User findByUsername(String username)
    {
        return userRepository
                .findByUsername(username)
                .orElse(null);
    }
}
