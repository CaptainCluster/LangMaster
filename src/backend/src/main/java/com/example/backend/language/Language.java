package com.example.backend.language;

import com.example.backend.user.User;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name="language")
public class Language {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    @Column(name = "language_id")
    private Integer id;

    @Column
    private String name;


    @ManyToMany(mappedBy = "studiedLanguages")
    private Set<User> studyingUsers;
}
