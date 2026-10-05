package com.sbconstructions.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
@SQLDelete(sql = "UPDATE projects SET deleted = true WHERE id = ?")   // soft delete
@SQLRestriction("deleted = false")
@Getter @Setter @NoArgsConstructor
public class Project {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank private String title;
    @Column(length = 2000) private String description;
    @NotBlank private String location;
    @NotBlank private String category;   // Residential / Commercial
    @NotBlank private String status;     // Ongoing / Completed / On Hold

    @Min(0) @Max(100)
    private Integer progress = 0;
    private Long budget;
    private LocalDate endDate;

    @Column(length = 500)
    private String image;                // URL returned by the upload API

    private boolean showOnWebsite = true;

    @JsonIgnore
    private boolean deleted = false;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}