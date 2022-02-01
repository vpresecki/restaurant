package com.porschedigital.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.porschedigital.restaurant.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {}
