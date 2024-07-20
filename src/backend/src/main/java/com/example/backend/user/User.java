package com.example.backend.user;

import com.example.backend.language.Language;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Set;

/**
 * Table: application_user
 * 
 * Used to store core user information, such as the 
 * username and password
 */
@Entity
@Table(name = "application_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column
    private LocalDate registerDate;

    @ManyToMany
    @JoinTable (
            name = "user_language",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "language_id")
    )
    private Set<Language> studiedLanguages;


    public User(){
        this.registerDate = LocalDate.now();
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.registerDate = LocalDate.now();
    }

    public void setId(Long id) {
        this.id = id;
    }
    public void setUsername(String newUsername) {
        this.username = newUsername;
    }
    public void setPassword(String newPassword) {
        this.password = newPassword;
    } 
    public void setRegisterDate(LocalDate newRegisterDate) {
        this.registerDate = newRegisterDate;
    }

    public long getId() {
        return this.id;
    }
    public String getUsername() {
        return this.username;
    }
    public String getPassword() {
        return this.password;
    }
    public LocalDate getRegisterDate() {
        return this.registerDate;
    }
}
