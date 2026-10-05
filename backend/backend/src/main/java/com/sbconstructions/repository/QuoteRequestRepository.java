package com.sbconstructions.repository;

import com.sbconstructions.entity.QuoteRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuoteRequestRepository extends JpaRepository<QuoteRequest, Long> {}