package com.sbconstructions.repository;

import com.sbconstructions.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByShowOnWebsiteTrueOrderByIdDesc();
}