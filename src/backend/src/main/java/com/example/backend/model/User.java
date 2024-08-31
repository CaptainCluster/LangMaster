package com.example.backend.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Set;

/**
 * Table: application_user
 * 
 * Used to store core user information, such as the 
 * username and password
 */
@Entity
@Table(name = "application_user")
public class User
{
    private static final String defaultBio = "The user has not written their bio yet.";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column
    private String bio;

    @Column(nullable = false)
    private LocalDate registerDate;

    @ManyToMany
    @JoinTable (
            name = "user_language",
            joinColumns = @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "fk_user")),
            inverseJoinColumns = @JoinColumn(name = "language_id")
    )
    private Set<Language> languages;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "progress_id", referencedColumnName = "progress_id")
    private Progress progress;

    // Constructors
    public User(){
        fillCommon();
    }

    public User(String username, String password)
    {
        this.username = username;
        this.password = password;
        fillCommon();
    }

    public void fillCommon()
    {
        this.registerDate = LocalDate.now();
        this.languages = Collections.emptySet();
        this.progress = new Progress();
        this.bio = defaultBio;
    }

    // Setters
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

    public void setProgress(Progress progress) {
        this.progress = progress;
    }

    public void setLanguages(Set<Language> languages) {
        this.languages = languages;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    // Getters
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

    public Set<Language> getLanguages() {
        return this.languages;
    }

    public String getBio() {
        return this.bio;
    }

    public Progress getProgress() {
        return progress;
    }
}

