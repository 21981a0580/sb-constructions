package com.sbconstructions.controller;

import com.sbconstructions.entity.QuoteRequest;
import com.sbconstructions.repository.QuoteRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/admin/quotes")
@RequiredArgsConstructor
public class AdminQuoteController {
    private static final Set<String> STATUSES = Set.of("New", "Contacted", "Closed");
    private final QuoteRequestRepository repo;

    @GetMapping
    public List<QuoteRequest> all() {
        return repo.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    @PatchMapping("/{id}")
    public QuoteRequest update(@PathVariable Long id, @RequestBody Map<String, String> body) {
        QuoteRequest q = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Quote not found"));
        String status = body.get("status");
        if (status != null) {
            if (!STATUSES.contains(status))
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid status");
            q.setStatus(status);
        }
        if (body.containsKey("notes")) q.setNotes(body.get("notes"));
        return repo.save(q);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}