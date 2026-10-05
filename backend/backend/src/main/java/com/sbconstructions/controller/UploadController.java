package com.sbconstructions.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.*;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/upload")
public class UploadController {
    private static final Set<String> ALLOWED = Set.of("image/jpeg", "image/png", "image/webp");
    private final Path dir;

    public UploadController(@Value("${app.upload-dir}") String uploadDir) throws IOException {
        this.dir = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(dir);
    }

    @PostMapping
    public Map<String, String> upload(@RequestParam("file") MultipartFile file) throws IOException {
        String type = file.getContentType();
        if (file.isEmpty() || type == null || !ALLOWED.contains(type)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only JPG, PNG or WEBP images are allowed");
        }
        String ext = switch (type) {
            case "image/png" -> ".png";
            case "image/webp" -> ".webp";
            default -> ".jpg";
        };
        String name = UUID.randomUUID() + ext;     // random name, never trust the original name
        file.transferTo(dir.resolve(name));
        return Map.of("url", "/uploads/" + name);
    }
}