package com.sbconstructions;

import com.sbconstructions.entity.Project;
import com.sbconstructions.entity.User;
import com.sbconstructions.repository.ProjectRepository;
import com.sbconstructions.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {
    private final UserRepository users;
    private final ProjectRepository projects;
    private final PasswordEncoder encoder;

    @Override
    public void run(String... args) {
        if (users.findByEmail("admin@sb.in").isEmpty()) {
            User u = new User();
            u.setName("Admin");
            u.setEmail("admin@sb.in");
            u.setPassword(encoder.encode("admin123"));   // change after first login
            u.setRole("ADMIN");
            users.save(u);
        }
        if (projects.count() == 0) {
            add("Modern Residence", "Hyderabad", "Residential", "Completed", 100, 8500000L, "2026-03-15");
            add("Commercial Complex", "Vizag", "Commercial", "Ongoing", 60, 25000000L, "2026-12-20");
            add("Apartment Building", "Bengaluru", "Residential", "Completed", 100, 40000000L, "2026-01-10");
            add("Office Building", "Chennai", "Commercial", "Ongoing", 35, 30000000L, "2027-02-28");
        }
    }

    private void add(String title, String loc, String cat, String status, int progress, long budget, String end) {
        Project p = new Project();
        p.setTitle(title); p.setLocation(loc); p.setCategory(cat); p.setStatus(status);
        p.setProgress(progress); p.setBudget(budget); p.setEndDate(LocalDate.parse(end));
        projects.save(p);
    }
}