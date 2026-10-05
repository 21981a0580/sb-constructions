package com.sbconstructions.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;   // BCrypt hash
    @Column(nullable = false)
    private String role;       // ADMIN or MANAGER
    private boolean active = true;

    @Entity
    @Table(name = "employees")
    @SQLDelete(sql = "UPDATE employees SET deleted = true WHERE id = ?")   // soft delete
    @SQLRestriction("deleted = false")
    @Getter @Setter @NoArgsConstructor
    public static class Employee {
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @NotBlank
        private String name;
        @NotBlank private String designation;
        private String phone;
        private String email;
        private Long salary;
        private String status = "Active";    // Active / On Leave / Inactive

        @Column(length = 500)
        private String photo;

        @JsonIgnore
        private boolean deleted = false;
    }
}