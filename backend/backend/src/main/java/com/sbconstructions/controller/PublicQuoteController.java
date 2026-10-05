package com.sbconstructions.controller;

import com.sbconstructions.entity.QuoteRequest;
import com.sbconstructions.repository.QuoteRequestRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public/quote")
@RequiredArgsConstructor
public class PublicQuoteController {
    private final QuoteRequestRepository repo;

    public record QuoteForm(
            @NotBlank @Size(max = 100) String name,
            @NotBlank @Size(max = 20) String phone,
            @Size(max = 100) String email,
            @Size(max = 100) String service,
            @Size(max = 2000) String message) {}

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void submit(@Valid @RequestBody QuoteForm f) {
        QuoteRequest q = new QuoteRequest();
        q.setName(f.name());
        q.setPhone(f.phone());
        q.setEmail(f.email());
        q.setService(f.service());
        q.setMessage(f.message());
        repo.save(q);               // status is always "New", the customer can't set it
    }
}